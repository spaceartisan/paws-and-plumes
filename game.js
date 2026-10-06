(() => {
  'use strict';

  const SAVE_KEY = 'paws-plumes-save-v1';
  const ENERGY_MS = 4 * 60 * 1000;
  const screen = document.getElementById('screen');
  const modalLayer = document.getElementById('modalLayer');
  const toastLayer = document.getElementById('toastLayer');
  let mapData = null;
  let mapImage = null;
  let selectedSpotId = 2;
  let toastTimer = null;
  let battle = null;

  const DEFAULT_STATE = {
    version: 1,
    name: 'Milo', level: 1, xp: 0, xpNext: 90,
    hp: 50, maxHp: 50, energy: 12, maxEnergy: 12, coins: 40,
    lastEnergyTick: Date.now(),
    attackBonus: 0, defenseBonus: 0,
    inventory: { rosemary: 1, reed: 0, grape: 0, iron: 1, cloth: 0, tonic: 1, provision: 0 },
    skills: {
      fencing: { level: 1, xp: 0 },
      foraging: { level: 1, xp: 0 },
      crafting: { level: 1, xp: 0 },
      alchemy: { level: 1, xp: 0 }
    },
    counters: {
      gathered: { rosemary: 0, reed: 0, grape: 0 },
      kills: { bandit: 0, boar: 0 },
      crafted: { field_tonic: 0, provision: 0, rapier_polish: 0, reinforced_doublet: 0 }
    },
    quests: { herbal: 'available', road: 'available', tonic: 'available' },
    discoveries: { bandit: false, boar: false, rosemary: false, reed: false, grape: false },
    currentScreen: 'town'
  };

  const QUESTS = {
    herbal: {
      title: 'Fresh Remedies', icon: '❧', giver: 'Mistress Juniper',
      text: 'The guild infirmary is short on rosemary. Bring back three sprigs from the old herb garden.',
      requirements: [{kind:'gathered', key:'rosemary', amount:3, label:'Rosemary gathered'}],
      reward: { coins: 25, xp: 35 }
    },
    road: {
      title: 'Keep the Old Road', icon: '⚔', giver: 'Captain Marrow',
      text: 'Two masked cutpurses have been troubling couriers beyond the south gate. Remind them whose road this is.',
      requirements: [{kind:'kills', key:'bandit', amount:2, label:'Bandits defeated'}],
      reward: { coins: 38, xp: 50, item: ['cloth', 1] }
    },
    tonic: {
      title: 'A Master’s Draught', icon: '⚗', giver: 'Alchemist Sable',
      text: 'Practice makes a proper apothecary. Brew two field tonics in the workshop.',
      requirements: [{kind:'crafted', key:'field_tonic', amount:2, label:'Field tonics brewed'}],
      reward: { coins: 45, xp: 55, item: ['iron', 1] }
    }
  };

  const RECIPES = {
    field_tonic: {
      title: 'Field Tonic', icon:'⚗', desc:'A sharp herbal restorative. Heals 18 HP in battle.',
      costs: { rosemary:2, reed:1 }, output: ['tonic',1], skills: [['crafting',8],['alchemy',10]]
    },
    provision: {
      title: 'Vintner’s Provision', icon:'◉', desc:'Dried grapes and herbs wrapped for the road. Restores 3 energy.',
      costs: { grape:2, rosemary:1 }, output: ['provision',1], skills: [['crafting',8]]
    },
    rapier_polish: {
      title: 'Guild Rapier Refit', icon:'†', desc:'True the guard and polish the edge. Permanent +2 attack.',
      costs: { iron:2, rosemary:1 }, unique:true, bonus:'attack', amount:2, skills:[['crafting',14]]
    },
    reinforced_doublet: {
      title: 'Reinforced Doublet', icon:'♜', desc:'Stitch hidden padding into your traveling coat. Permanent +2 defense.',
      costs: { cloth:2, reed:2 }, unique:true, bonus:'defense', amount:2, skills:[['crafting',14]]
    }
  };

  const ITEMS = {
    rosemary:['Rosemary','❧','A fragrant medicinal herb.'],
    reed:['River Reed','〰','Tough flexible fiber from the canal bank.'],
    grape:['Sun Grape','●','Small sweet grapes from an abandoned vineyard.'],
    iron:['Iron Fitting','◆','Useful metal scavenged from tools and brigands.'],
    cloth:['Velvet Scrap','▰','Fine cloth worth saving for repairs.'],
    tonic:['Field Tonic','⚗','Heals 18 HP during battle.'],
    provision:['Vintner’s Provision','◉','Restores 3 energy outside battle.']
  };

  const ENEMIES = {
    bandit: { name:'Masked Cutpurse', art:'assets/art/bandit_cat.png', hp:30, attack:6, defense:1, xp:24, coins:[7,12] },
    boar: { name:'Bristleback Boar', art:'assets/art/wild_boar.png', hp:42, attack:8, defense:2, xp:32, coins:[9,15] }
  };

  const state = loadState();
  applyOfflineEnergy();

  function cloneDefault() { return JSON.parse(JSON.stringify(DEFAULT_STATE)); }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return cloneDefault();
      const parsed = JSON.parse(raw);
      return deepMerge(cloneDefault(), parsed);
    } catch (err) {
      console.warn('Save could not be loaded', err);
      return cloneDefault();
    }
  }

  function deepMerge(base, extra) {
    Object.keys(extra || {}).forEach(k => {
      if (extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k]) && base[k] && typeof base[k] === 'object') deepMerge(base[k], extra[k]);
      else base[k] = extra[k];
    });
    return base;
  }

  function saveState() {
    state.lastEnergyTick = state.lastEnergyTick || Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    updateHeader();
  }

  function applyOfflineEnergy() {
    const now = Date.now();
    if (state.energy >= state.maxEnergy) { state.lastEnergyTick = now; return; }
    const gained = Math.floor((now - state.lastEnergyTick) / ENERGY_MS);
    if (gained > 0) {
      state.energy = Math.min(state.maxEnergy, state.energy + gained);
      state.lastEnergyTick += gained * ENERGY_MS;
      saveState();
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function updateHeader() {
    document.getElementById('heroName').textContent = state.name;
    document.getElementById('levelBadge').textContent = `Lv. ${state.level}`;
    document.getElementById('hpText').textContent = `${state.hp}/${state.maxHp}`;
    document.getElementById('energyText').textContent = `${state.energy}/${state.maxEnergy}`;
    document.getElementById('coinsText').textContent = state.coins;
    document.getElementById('xpBar').style.width = `${Math.min(100, (state.xp/state.xpNext)*100)}%`;
  }

  function setScreen(name) {
    state.currentScreen = name;
    saveState();
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.screen === name));
    render();
    screen.focus({preventScroll:true});
    window.scrollTo({top:0, behavior:'instant'});
  }

  function render() {
    applyOfflineEnergy();
    updateHeader();
    if (state.currentScreen === 'town') renderTown();
    else if (state.currentScreen === 'explore') renderExplore();
    else if (state.currentScreen === 'workshop') renderWorkshop();
    else renderJournal();
  }

  function renderTown() {
    const active = Object.values(state.quests).filter(v => v === 'active').length;
    screen.innerHTML = `
      <section class="town-hero">
        <span class="ribbon">PORT FELIN • FREE CITY</span>
        <h2>Morning at the Gilded Paw</h2>
        <p>Silk merchants shout across the piazza, printing presses clatter, and every alley promises a job—or a duel.</p>
      </section>
      <div class="grid-2">
        <button class="action-card accent" data-action="guild"><span class="big-icon">⚜</span><strong>Guild Hall</strong><small>${active} active quest${active===1?'':'s'} • commissions & rewards</small></button>
        <button class="action-card" data-action="market"><span class="big-icon">◈</span><strong>Mercato</strong><small>Buy supplies from the morning stalls</small></button>
        <button class="action-card" data-action="inn"><span class="big-icon">☾</span><strong>The Warm Saucer</strong><small>Rest, recover and hear street gossip</small></button>
        <button class="action-card" data-action="train"><span class="big-icon">†</span><strong>Fencing Yard</strong><small>Practice footwork for 8 crowns</small></button>
      </div>
      <div class="section-title" style="margin-top:20px"><div><span class="kicker">TODAY IN PORT FELIN</span><h2>Guild Noticeboard</h2><p>Small jobs build a large reputation.</p></div></div>
      <div class="card">${renderQuestRows(true)}</div>
    `;
  }

  function renderQuestRows(compact=false) {
    return Object.entries(QUESTS).map(([id,q]) => {
      const status = state.quests[id];
      const progress = questProgress(id);
      const pct = Math.min(100, progress.pct);
      let side = '';
      if (status === 'available') side = `<button class="btn secondary" data-action="accept-quest" data-id="${id}">Accept</button>`;
      else if (status === 'active' && progress.complete) side = `<button class="btn" data-action="claim-quest" data-id="${id}">Claim</button>`;
      else if (status === 'claimed') side = `<span class="pill">Complete</span>`;
      else side = `<span class="pill">${progress.text}</span>`;
      return `<div class="quest-row"><div class="quest-icon">${q.icon}</div><div class="row-copy"><strong>${q.title}</strong><small>${compact?q.giver:q.text}</small>${status==='active'?`<div class="progress-mini"><span style="width:${pct}%"></span></div>`:''}</div><div class="row-side">${side}</div></div>`;
    }).join('');
  }

  function questProgress(id) {
    const q = QUESTS[id];
    let done = 0;
    let total = 0;
    const labels = [];
    q.requirements.forEach(r => {
      const current = state.counters[r.kind][r.key] || 0;
      done += Math.min(current, r.amount);
      total += r.amount;
      labels.push(`${Math.min(current,r.amount)}/${r.amount}`);
    });
    return {complete: done >= total, pct: total ? (done/total)*100 : 100, text:labels.join(' • ')};
  }

  function acceptQuest(id) {
    if (state.quests[id] !== 'available') return;
    state.quests[id] = 'active';
    saveState();
    toast(`Quest accepted: ${QUESTS[id].title}`);
    render();
  }

  function claimQuest(id) {
    if (state.quests[id] !== 'active' || !questProgress(id).complete) return;
    const reward = QUESTS[id].reward;
    state.coins += reward.coins || 0;
    addPlayerXp(reward.xp || 0);
    if (reward.item) addItem(reward.item[0], reward.item[1]);
    state.quests[id] = 'claimed';
    saveState();
    toast(`Commission complete! +${reward.coins} crowns, +${reward.xp} XP`);
    render();
  }

  function renderExplore() {
    screen.innerHTML = `
      <div class="section-title"><div><span class="kicker">BEYOND THE SOUTH GATE</span><h2>Gilded Outskirts</h2><p>Tap a marked location. Each action costs 1 energy.</p></div><span class="pill">⚡ ${state.energy}/${state.maxEnergy}</span></div>
      <div class="map-frame"><canvas id="worldMap" width="768" height="512" aria-label="Map of the Gilded Outskirts"></canvas></div>
      <div class="map-legend"><span>❧ Gather</span><span>⚔ Battle</span><span>⌂ Safe</span></div>
      <div id="spotDetails"></div>
    `;
    loadAndDrawMap();
  }

  async function loadAndDrawMap() {
    try {
      if (!mapData) mapData = await fetch('assets/maps/gilded_outskirts.json').then(r => r.json());
      if (!mapImage) {
        mapImage = new Image();
        mapImage.src = 'assets/maps/tileset.png';
        await mapImage.decode();
      }
      drawMap();
      const canvas = document.getElementById('worldMap');
      canvas.addEventListener('pointerup', mapPointer);
      renderSpotDetails();
    } catch (err) {
      console.error(err);
      document.querySelector('.map-frame').innerHTML = '<div class="empty">The cartographer misplaced this map. Reload the page to try again.</div>';
    }
  }

  function drawMap() {
    const canvas = document.getElementById('worldMap');
    if (!canvas || !mapData || !mapImage) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const ground = mapData.layers.find(l => l.name === 'Ground');
    ground.data.forEach((gid,i) => {
      if (!gid) return;
      const idx = gid - 1;
      const sx = (idx % 4) * 64;
      const sy = Math.floor(idx / 4) * 64;
      const dx = (i % mapData.width) * 64;
      const dy = Math.floor(i / mapData.width) * 64;
      ctx.drawImage(mapImage,sx,sy,64,64,dx,dy,64,64);
    });
    const spots = mapData.layers.find(l=>l.name==='Adventure Spots').objects;
    spots.forEach(o => {
      const cx = o.x + o.width/2, cy = o.y + o.height/2;
      const selected = o.id === selectedSpotId;
      ctx.beginPath();
      ctx.arc(cx,cy,selected?25:20,0,Math.PI*2);
      ctx.fillStyle = selected ? '#f4df85' : (o.type === 'battle' ? '#7b3d3f' : o.type==='gather' ? '#355e59' : '#c1983b');
      ctx.fill();
      ctx.lineWidth = selected ? 5 : 3;
      ctx.strokeStyle = '#2d2925';
      ctx.stroke();
      ctx.fillStyle = selected ? '#2d2925' : '#fff6da';
      ctx.font = 'bold 24px Georgia';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(o.type==='battle'?'⚔':o.type==='gather'?'❧':'⌂',cx,cy+1);
    });
  }

  function mapPointer(e) {
    if (!mapData) return;
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const spots = mapData.layers.find(l=>l.name==='Adventure Spots').objects;
    let nearest = null, distance = Infinity;
    spots.forEach(o => {
      const dx = x-(o.x+o.width/2), dy = y-(o.y+o.height/2);
      const d = Math.hypot(dx,dy);
      if (d < distance) { distance=d; nearest=o; }
    });
    if (nearest && distance < 62) {
      selectedSpotId = nearest.id;
      drawMap();
      renderSpotDetails();
    }
  }

  function spotProp(spot,name) {
    const p = (spot.properties||[]).find(x=>x.name===name);
    return p ? p.value : null;
  }

  function renderSpotDetails() {
    const holder = document.getElementById('spotDetails');
    if (!holder || !mapData) return;
    const spot = mapData.layers.find(l=>l.name==='Adventure Spots').objects.find(o=>o.id===selectedSpotId) || mapData.layers.find(l=>l.name==='Adventure Spots').objects[0];
    const typeInfo = spot.type==='battle' ? ['⚔','Danger','Challenge'] : spot.type==='gather' ? ['❧','Resource','Gather'] : ['⌂','Safe haven','Return'];
    const descriptions = {
      'South Gate':'The guards keep lanterns burning here. A safe route back to Port Felin.',
      'Herb Garden':'Stone beds from an old monastery still grow stubborn rosemary.',
      'Old Road':'A narrow trade road where masked cats have begun taxing travelers without permission.',
      'Boar Grove':'A mossy orchard churned into mud by an unusually territorial bristleback.',
      'Riverbank':'Tall reeds bend along the canal, useful for cord, baskets and apothecary work.',
      'Abandoned Vineyard':'Sun-warmed terraces where small black grapes still cling to wild vines.'
    };
    let action = '';
    if (spot.type==='gather') action = `<button class="btn teal" data-action="gather" data-resource="${spotProp(spot,'resource')}">${typeInfo[2]} • 1 ⚡</button>`;
    else if (spot.type==='battle') action = `<button class="btn wine" data-action="battle" data-enemy="${spotProp(spot,'enemy')}">${typeInfo[2]} • 1 ⚡</button>`;
    else action = `<button class="btn secondary" data-screen="town">Back to town</button>`;
    holder.innerHTML = `<div class="card spot-card"><div class="spot-symbol">${typeInfo[0]}</div><div class="spot-copy"><span class="kicker">${typeInfo[1]}</span><h3>${spot.name}</h3><p>${descriptions[spot.name]||''}</p></div>${action}</div>`;
  }

  function spendEnergy(amount=1) {
    applyOfflineEnergy();
    if (state.energy < amount) { toast('You are out of energy. Rest at the inn or wait for it to recover.'); return false; }
    if (state.energy === state.maxEnergy) state.lastEnergyTick = Date.now();
    state.energy -= amount;
    saveState();
    return true;
  }

  function gather(resource) {
    if (!spendEnergy(1)) return;
    const skill = state.skills.foraging.level;
    let amount = 1 + (Math.random() < Math.min(.55, .18 + skill*.05) ? 1 : 0);
    if (Math.random() < Math.min(.20, skill*.02)) amount += 1;
    addItem(resource, amount);
    state.counters.gathered[resource] = (state.counters.gathered[resource]||0) + amount;
    state.discoveries[resource] = true;
    addSkillXp('foraging', 8);
    addPlayerXp(4);
    saveState();
    const label = ITEMS[resource]?.[0] || resource;
    toast(`Gathered ${amount} ${label}${amount>1?'s':''}.`);
    renderExplore();
  }

  function startBattle(enemyKey) {
    if (!spendEnergy(1)) return;
    const proto = ENEMIES[enemyKey];
    if (!proto) return;
    state.discoveries[enemyKey] = true;
    battle = {
      enemyKey,
      enemyHp: proto.hp,
      enemyMaxHp: proto.hp,
      focus: 0,
      guarding: false,
      log: `${proto.name} blocks the road. Steel flashes in the morning light.`
    };
    saveState();
    renderBattle();
  }

  function playerAttack(multiplier=1, flourish=false) {
    if (!battle) return;
    const enemy = ENEMIES[battle.enemyKey];
    const fencingBonus = Math.floor((state.skills.fencing.level-1)/2);
    const base = 6 + state.attackBonus + fencingBonus;
    const damage = Math.max(1, Math.round((base + rand(-1,3)) * multiplier) - enemy.defense);
    battle.enemyHp = Math.max(0,battle.enemyHp-damage);
    battle.log = flourish ? `You lunge with a flourishing riposte for ${damage} damage.` : `Your rapier strikes for ${damage} damage.`;
    if (flourish) addSkillXp('fencing',5); else { battle.focus=Math.min(3,battle.focus+1); addSkillXp('fencing',3); }
    if (battle.enemyHp <= 0) { winBattle(); return; }
    enemyTurn();
  }

  function guardBattle() {
    if (!battle) return;
    battle.guarding = true;
    battle.focus = Math.min(3,battle.focus+1);
    battle.log = 'You settle into a guarded stance and watch the enemy’s shoulders.';
    enemyTurn();
  }

  function useTonic() {
    if (!battle || state.inventory.tonic <= 0) { toast('No field tonics in your satchel.'); return; }
    if (state.hp >= state.maxHp) { toast('You are already at full health.'); return; }
    state.inventory.tonic--;
    const healed = Math.min(18, state.maxHp-state.hp);
    state.hp += healed;
    battle.log = `You drink a field tonic and recover ${healed} HP.`;
    saveState();
    enemyTurn();
  }

  function attemptFlee() {
    if (!battle) return;
    if (Math.random() < .72) {
      battle = null; closeModal(); toast('You slip away before the next strike.'); render();
    } else {
      battle.log = 'The enemy cuts off your retreat.';
      enemyTurn();
    }
  }

  function enemyTurn() {
    if (!battle) return;
    const enemy = ENEMIES[battle.enemyKey];
    const defense = 2 + state.defenseBonus + Math.floor((state.level-1)/3);
    let dmg = Math.max(1, enemy.attack + rand(-1,2) - defense);
    if (battle.guarding) dmg = Math.max(1, Math.ceil(dmg/2));
    state.hp = Math.max(0,state.hp-dmg);
    battle.log += ` ${enemy.name} answers for ${dmg} damage${battle.guarding?' against your guard':''}.`;
    battle.guarding = false;
    saveState();
    if (state.hp <= 0) { loseBattle(); return; }
    renderBattle();
  }

  function winBattle() {
    const enemy = ENEMIES[battle.enemyKey];
    const coins = rand(enemy.coins[0],enemy.coins[1]);
    state.coins += coins;
    state.counters.kills[battle.enemyKey] = (state.counters.kills[battle.enemyKey]||0)+1;
    addPlayerXp(enemy.xp);
    addSkillXp('fencing',6);
    let drop = '';
    if (battle.enemyKey==='bandit') {
      const item = Math.random()<.55?'cloth':'iron'; addItem(item,1); drop=` • ${ITEMS[item][0]}`;
    } else if (battle.enemyKey==='boar' && Math.random()<.55) {
      addItem('reed',1); drop=' • River Reed';
    }
    saveState();
    battle.log = `${enemy.name} yields. You earn ${coins} crowns and ${enemy.xp} XP${drop}.`;
    renderBattle(true);
  }

  function loseBattle() {
    const lost = Math.min(state.coins, Math.max(2, Math.floor(state.coins*.1)));
    state.coins -= lost;
    state.hp = Math.max(1,Math.ceil(state.maxHp*.55));
    saveState();
    const enemy = ENEMIES[battle.enemyKey];
    battle.log = `${enemy.name} gets the better of you. A passing courier drags you back toward town. You lose ${lost} crowns.`;
    renderBattle(false,true);
  }

  function renderBattle(won=false,lost=false) {
    if (!battle) return;
    const enemy = ENEMIES[battle.enemyKey];
    const pPct = Math.max(0,state.hp/state.maxHp*100), ePct = Math.max(0,battle.enemyHp/battle.enemyMaxHp*100);
    const dots = [0,1,2].map(i=>`<span class="dot ${i<battle.focus?'on':''}"></span>`).join('');
    modalLayer.innerHTML = `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="Battle with ${enemy.name}">
      <div class="modal-header"><h2>${won?'Victory':lost?'Defeated':'Roadside Duel'}</h2><button class="close-btn" data-action="battle-close">×</button></div>
      <div class="modal-content">
        <div class="battle-stage">
          <div class="fighter"><img src="assets/art/player_cat.png" alt="${escapeHtml(state.name)}"><strong>${escapeHtml(state.name)}</strong><div class="health"><span style="width:${pPct}%"></span></div></div>
          <div class="fighter"><img src="${enemy.art}" alt="${enemy.name}"><strong>${enemy.name}</strong><div class="health"><span style="width:${ePct}%"></span></div></div>
        </div>
        <div class="battle-log">${battle.log}</div>
        ${won||lost ? `<button class="btn teal" style="width:100%" data-action="battle-close">Return to the road</button>` : `
          <div class="focus-dots">FOCUS ${dots}<span style="margin-left:5px">Flourish costs 2</span></div>
          <div class="battle-actions">
            <button class="btn" data-action="battle-attack">Attack</button>
            <button class="btn wine" data-action="battle-flourish" ${battle.focus<2?'disabled':''}>Flourish</button>
            <button class="btn secondary" data-action="battle-guard">Guard</button>
            <button class="btn secondary" data-action="battle-tonic" ${state.inventory.tonic<1?'disabled':''}>Tonic (${state.inventory.tonic})</button>
            <button class="btn secondary" style="grid-column:1/-1" data-action="battle-flee">Withdraw</button>
          </div>`}
      </div></section></div>`;
  }

  function renderWorkshop() {
    const rows = Object.entries(RECIPES).map(([id,r]) => {
      const already = r.unique && state.counters.crafted[id] > 0;
      const can = !already && canCraft(r);
      const costs = Object.entries(r.costs).map(([k,n]) => `<span class="${(state.inventory[k]||0)<n?'missing':''}">${ITEMS[k][1]} ${ITEMS[k][0]} ${state.inventory[k]||0}/${n}</span>`).join('');
      return `<div class="recipe-row"><div class="item-icon">${r.icon}</div><div class="row-copy"><strong>${r.title}</strong><small>${r.desc}</small><div class="recipe-cost">${costs}</div></div><div class="row-side"><button class="btn ${can?'':'secondary'}" data-action="craft" data-id="${id}" ${!can?'disabled':''}>${already?'Owned':'Craft'}</button></div></div>`;
    }).join('');
    screen.innerHTML = `
      <div class="section-title"><div><span class="kicker">WORKBENCH & APOTHECARY</span><h2>Guild Workshop</h2><p>Turn what you gather into tools for the road.</p></div></div>
      <div class="note">Crafting improves through use. Fencing, Foraging, Crafting and Alchemy each level independently.</div>
      <div class="card" style="margin-top:12px">${rows}</div>
      <div class="section-title" style="margin-top:20px"><div><span class="kicker">SATCHEL</span><h2>Materials</h2></div></div>
      <div class="card">${renderInventory()}</div>
    `;
  }

  function canCraft(recipe) {
    return Object.entries(recipe.costs).every(([k,n]) => (state.inventory[k]||0) >= n);
  }

  function craft(id) {
    const r = RECIPES[id];
    if (!r || !canCraft(r) || (r.unique && state.counters.crafted[id] > 0)) return;
    Object.entries(r.costs).forEach(([k,n]) => state.inventory[k]-=n);
    if (r.output) addItem(r.output[0],r.output[1]);
    if (r.bonus==='attack') state.attackBonus += r.amount;
    if (r.bonus==='defense') state.defenseBonus += r.amount;
    state.counters.crafted[id] = (state.counters.crafted[id]||0)+1;
    (r.skills||[]).forEach(([skill,xp])=>addSkillXp(skill,xp));
    addPlayerXp(7);
    saveState();
    toast(`Crafted: ${r.title}`);
    renderWorkshop();
  }

  function renderInventory() {
    return Object.entries(ITEMS).map(([id,it]) => `<div class="inventory-row"><div class="item-icon">${it[1]}</div><div class="row-copy"><strong>${it[0]}</strong><small>${it[2]}</small></div><div class="inventory-count">×${state.inventory[id]||0}</div>${id==='provision' && state.inventory[id]>0 ? `<button class="btn secondary" data-action="use-provision">Use</button>`:''}</div>`).join('');
  }

  function useProvision() {
    if ((state.inventory.provision||0)<1 || state.energy>=state.maxEnergy) return;
    state.inventory.provision--;
    const gain = Math.min(3,state.maxEnergy-state.energy);
    state.energy += gain;
    saveState(); toast(`Restored ${gain} energy.`); renderWorkshop();
  }

  function renderJournal() {
    const skills = Object.entries(state.skills).map(([id,s]) => {
      const next = skillNext(s.level), pct = Math.min(100,s.xp/next*100);
      const meta = {fencing:['Fencing','†','Improves with successful attacks.'],foraging:['Foraging','❧','Improves each time you gather.'],crafting:['Crafting','⚒','Improves by making gear and supplies.'],alchemy:['Alchemy','⚗','Improves when brewing remedies.']}[id];
      return `<div class="skill-row"><div class="skill-orb"><span class="skill-level">${s.level}</span></div><div class="row-copy"><strong>${meta[1]} ${meta[0]}</strong><small>${meta[2]} • ${s.xp}/${next} XP</small><div class="progress-mini"><span style="width:${pct}%"></span></div></div></div>`;
    }).join('');
    screen.innerHTML = `
      <div class="subtabs"><button class="subtab active">Quests</button><button class="subtab">Skills</button><button class="subtab">Bestiary</button></div>
      <section id="journalPane">
        <div class="section-title"><div><span class="kicker">GUILD LEDGER</span><h2>Quest Journal</h2><p>Your accepted commissions and completed work.</p></div></div>
        <div class="card">${renderQuestRows(false)}</div>
      </section>
      <section id="skillsPane" hidden>
        <div class="section-title"><div><span class="kicker">PRACTICE MAKES MASTER</span><h2>Skills</h2><p>Skills rise through use instead of spending points.</p></div></div>
        <div class="card">${skills}</div>
      </section>
      <section id="bestiaryPane" hidden>
        <div class="section-title"><div><span class="kicker">FIELD NOTES</span><h2>Discoveries</h2><p>Creatures and materials you have encountered.</p></div></div>
        <div class="card">${renderDiscoveries()}</div>
      </section>
    `;
    document.querySelectorAll('.subtab').forEach((btn,i)=>btn.addEventListener('click',()=>{
      document.querySelectorAll('.subtab').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
      document.getElementById('journalPane').hidden=i!==0; document.getElementById('skillsPane').hidden=i!==1; document.getElementById('bestiaryPane').hidden=i!==2;
    }));
  }

  function renderDiscoveries() {
    const entries = [
      ['rosemary','Rosemary','❧','Herb garden'], ['reed','River Reed','〰','Canal bank'], ['grape','Sun Grape','●','Old vineyard'],
      ['bandit','Masked Cutpurse','⚔','Old road'], ['boar','Bristleback Boar','♞','Boar grove']
    ];
    return entries.map(([id,name,icon,where])=>`<div class="inventory-row"><div class="item-icon">${state.discoveries[id]?icon:'?'}</div><div class="row-copy"><strong>${state.discoveries[id]?name:'Undiscovered'}</strong><small>${state.discoveries[id]?where:'Keep exploring the outskirts.'}</small></div></div>`).join('');
  }

  function addItem(key, amount) { state.inventory[key] = (state.inventory[key]||0)+amount; }

  function addPlayerXp(amount) {
    state.xp += amount;
    while (state.xp >= state.xpNext) {
      state.xp -= state.xpNext;
      state.level++;
      state.xpNext = Math.round(state.xpNext*1.28 + 18);
      state.maxHp += 6; state.hp = state.maxHp;
      if (state.level%2===0) { state.maxEnergy++; state.energy=Math.min(state.maxEnergy,state.energy+1); }
      setTimeout(()=>toast(`Level ${state.level}! Maximum health increased.`),50);
    }
  }

  function skillNext(level) { return 26 + level*18; }
  function addSkillXp(id, amount) {
    const s = state.skills[id]; if (!s) return;
    s.xp += amount;
    while (s.xp >= skillNext(s.level)) {
      s.xp -= skillNext(s.level); s.level++;
      setTimeout(()=>toast(`${id[0].toUpperCase()+id.slice(1)} reached level ${s.level}.`),100);
    }
  }

  function rand(a,b) { return Math.floor(Math.random()*(b-a+1))+a; }

  function showGuild() {
    modalLayer.innerHTML = `<div class="modal-backdrop"><section class="modal"><div class="modal-header"><h2>Gilded Paw Guild</h2><button class="close-btn" data-action="close-modal">×</button></div><div class="modal-content"><p style="margin-top:0;color:#6c6050">Commissions are posted by merchants, artisans and the city watch.</p><div class="card">${renderQuestRows(false)}</div></div></section></div>`;
  }

  function showMarket() {
    const goods = [['tonic','Field Tonic',15],['iron','Iron Fitting',12],['cloth','Velvet Scrap',10],['provision','Vintner’s Provision',11]];
    modalLayer.innerHTML = `<div class="modal-backdrop"><section class="modal"><div class="modal-header"><h2>Mercato del Gatto</h2><button class="close-btn" data-action="close-modal">×</button></div><div class="modal-content"><div class="card">${goods.map(([id,n,p])=>`<div class="inventory-row"><div class="item-icon">${ITEMS[id][1]}</div><div class="row-copy"><strong>${n}</strong><small>${ITEMS[id][2]}</small></div><button class="btn secondary" data-action="buy" data-id="${id}" data-price="${p}">${p} ◈</button></div>`).join('')}</div></div></section></div>`;
  }

  function buy(id,price) {
    if (state.coins < price) { toast('Not enough crowns.'); return; }
    state.coins -= price; addItem(id,1); saveState(); toast(`Bought ${ITEMS[id][0]}.`); showMarket(); updateHeader();
  }

  function restAtInn() {
    const price = 8;
    if (state.coins < price) { toast('A room and supper cost 8 crowns.'); return; }
    if (state.hp===state.maxHp && state.energy===state.maxEnergy) { toast('You already feel fully rested.'); return; }
    state.coins -= price; state.hp=state.maxHp; state.energy=state.maxEnergy; state.lastEnergyTick=Date.now(); saveState(); toast('A warm meal and a deep nap restore you completely.'); renderTown();
  }

  function trainFencing() {
    if (state.coins < 8) { toast('The fencing master charges 8 crowns.'); return; }
    state.coins -= 8; addSkillXp('fencing',12); addPlayerXp(3); saveState(); toast('You drill lunges, parries and measured footwork.'); renderTown();
  }

  function showSettings() {
    modalLayer.innerHTML = `<div class="modal-backdrop"><section class="modal"><div class="modal-header"><h2>Game Settings</h2><button class="close-btn" data-action="close-modal">×</button></div><div class="modal-content"><div class="settings-grid"><label><span><strong>Hero name</strong><br><small>Saved on this device</small></span><input id="nameInput" maxlength="16" value="${escapeHtml(state.name)}" style="max-width:130px;padding:9px;border:1px solid #a58e61;border-radius:9px;background:#fffaf0"></label><button class="btn teal" data-action="save-name">Save name</button><button class="btn secondary danger" data-action="reset-save">Start a new game</button></div><p style="font-size:12px;color:#776a59;margin-bottom:0">Progress is stored locally in your browser. Energy recovers by 1 every 4 minutes.</p></div></section></div>`;
  }

  function closeModal() { modalLayer.innerHTML=''; }

  function toast(message) {
    clearTimeout(toastTimer);
    toastLayer.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`;
    toastTimer = setTimeout(()=>toastLayer.innerHTML='',2600);
  }

  document.querySelector('.bottom-nav').addEventListener('click', e => {
    const btn = e.target.closest('[data-screen]'); if (btn) setScreen(btn.dataset.screen);
  });
  document.getElementById('settingsBtn').addEventListener('click',showSettings);

  document.addEventListener('click', e => {
    const target = e.target.closest('[data-action], [data-screen]');
    if (!target) return;
    if (target.dataset.screen && !target.classList.contains('nav-btn')) { closeModal(); setScreen(target.dataset.screen); return; }
    const a = target.dataset.action;
    if (!a) return;
    if (a==='guild') showGuild();
    else if (a==='market') showMarket();
    else if (a==='inn') restAtInn();
    else if (a==='train') trainFencing();
    else if (a==='accept-quest') { acceptQuest(target.dataset.id); if(modalLayer.innerHTML) showGuild(); }
    else if (a==='claim-quest') { claimQuest(target.dataset.id); if(modalLayer.innerHTML) showGuild(); }
    else if (a==='gather') gather(target.dataset.resource);
    else if (a==='battle') startBattle(target.dataset.enemy);
    else if (a==='craft') craft(target.dataset.id);
    else if (a==='use-provision') useProvision();
    else if (a==='buy') buy(target.dataset.id, Number(target.dataset.price));
    else if (a==='close-modal') closeModal();
    else if (a==='battle-close') { battle=null; closeModal(); render(); }
    else if (a==='battle-attack') playerAttack(1,false);
    else if (a==='battle-flourish') { if (battle && battle.focus>=2) { battle.focus-=2; playerAttack(1.8,true); } }
    else if (a==='battle-guard') guardBattle();
    else if (a==='battle-tonic') useTonic();
    else if (a==='battle-flee') attemptFlee();
    else if (a==='save-name') {
      const value = document.getElementById('nameInput')?.value.trim(); if(value){state.name=value.slice(0,16);saveState();closeModal();toast('Name updated.');render();}
    }
    else if (a==='reset-save') {
      if (confirm('Erase this local save and begin again?')) { localStorage.removeItem(SAVE_KEY); location.reload(); }
    }
  });

  setInterval(() => { const before=state.energy; applyOfflineEnergy(); if (state.energy!==before) { updateHeader(); if(state.currentScreen==='explore') renderExplore(); } }, 30000);
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.screen===state.currentScreen));
  render();
})();
