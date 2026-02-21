(() => {
    const EASE_SMOOTH = "cubic-bezier(0.25, 0.8, 0.25, 1)"; 
    const EASE_PANEL = "cubic-bezier(0.22, 0.61, 0.36, 1)";

    const css = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        
        #arq-tracker-panel {
            position: fixed; top: 20px; left: 20px; width: 340px;
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(10, 15, 30, 0.98));
            border: 1px solid rgba(255, 0, 60, 0.3); border-top: 2px solid rgba(255, 0, 60, 0.6);
            border-radius: 16px;
            color: #e2e8f0; font-family: 'Inter', sans-serif; z-index: 99999;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6); backdrop-filter: blur(20px);
            transition: height 0.5s ${EASE_PANEL}, background 0.3s ease;
            overflow: hidden; 
        }
        #arq-tracker-panel.minimized { height: 68px !important; overflow: hidden; }

        .stalker-avatar-container {
            display: flex; justify-content: center; margin-bottom: 5px;
            height: 0; opacity: 0; overflow: hidden;
            transition: all 0.5s ${EASE_PANEL};
        }
        .stalker-avatar-container.visible {
            height: 100px; opacity: 1; margin-bottom: 15px;
        }
        .stalker-img {
            width: 90px; height: 90px; border-radius: 50%;
            border: 3px solid rgba(255, 0, 60, 0.8);
            box-shadow: 0 0 25px rgba(255, 0, 60, 0.4);
            object-fit: cover; background: #1e293b;
            transform: scale(0.5); transition: transform 0.5s ${EASE_PANEL};
        }
        .stalker-avatar-container.visible .stalker-img {
            transform: scale(1);
        }

        #arq-side-panel {
            position: fixed; top: 20px; left: 370px; width: 300px; height: 0;
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-left: 2px solid rgba(255, 0, 60, 0.5);
            border-radius: 16px;
            color: #e2e8f0; font-family: 'Inter', sans-serif; z-index: 99998;
            backdrop-filter: blur(20px);
            transition: height 0.5s ${EASE_PANEL}, opacity 0.4s ${EASE_SMOOTH}, transform 0.5s ${EASE_PANEL};
            opacity: 0; pointer-events: none;
            display: flex; flex-direction: column;
            box-shadow: 10px 20px 40px rgba(0,0,0,0.4);
            transform: translateX(-30px) scale(0.98);
        }
        #arq-side-panel.open { 
            height: 550px; opacity: 1; pointer-events: all;
            transform: translateX(0) scale(1);
        }

        .arq-header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 16px 20px; cursor: grab; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.08); user-select: none;
            background: rgba(0,0,0,0.2);
            transition: background 0.3s ease;
        }
        .arq-header:active { cursor: grabbing; background: rgba(0,0,0,0.4); }
        .arq-header h2 { 
            margin: 0; color: #fff; font-size: 14px; letter-spacing: 1px; font-weight: 800; 
            text-transform: uppercase;
            background: linear-gradient(90deg, #ff003c, #ff6a00); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        
        .min-btn { 
            background: rgba(255,255,255,0.05); 
            border: 1px solid rgba(255,255,255,0.1); 
            color: #94a3b8; width: 32px; height: 32px;
            border-radius: 8px; cursor: pointer; 
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s ease; padding: 0; margin-left: 8px;
        }
        .min-btn:hover { 
            background: rgba(255,255,255,0.15); color: #fff; 
            border-color: rgba(255,255,255,0.3); transform: translateY(-1px);
        }
        .min-btn:active { transform: translateY(1px); }
        .min-btn svg { width: 18px; height: 18px; fill: currentColor; }

        .min-btn.active-filter {
            background: rgba(59, 130, 246, 0.2);
            border-color: #3b82f6;
            color: #60a5fa;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }

        .side-header {
            padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
            font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase;
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(0,0,0,0.3); border-radius: 16px 16px 0 0;
        }
        .side-actions { display: flex; align-items: center; }
        .side-title { color: #fff; }

        .arq-main-tabs { display: flex; padding: 4px; background: rgba(0,0,0,0.3); margin: 15px; border-radius: 12px; }
        .arq-tab { 
            flex: 1; padding: 8px; text-align: center; cursor: pointer; 
            font-size: 11px; font-weight: 600; color: #64748b; 
            transition: all 0.3s ${EASE_SMOOTH}; border-radius: 8px;
        }
        .arq-tab:hover { color: #b0bace; }
        .arq-tab.active { color: #fff; background: rgba(255, 255, 255, 0.1); transform: scale(1.02); }

        .sub-tabs { display: flex; gap: 8px; margin-bottom: 15px; }
        .sub-tab { 
            flex: 1; height: 45px; 
            display: flex; align-items: center; justify-content: center;
            font-size: 10px; font-weight: 600;
            border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; 
            cursor: pointer; color: #94a3b8; 
            transition: all 0.3s ${EASE_SMOOTH};
            background: rgba(255,255,255,0.03); text-align: center; line-height: 1.1;
        }
        .sub-tab:hover { background: rgba(255,255,255,0.08); transform: translateY(-2px); }
        
        #sub-tab-new.active, #me-tab-new.active { border-color: #34d399; color: #34d399; background: rgba(16, 185, 129, 0.1); }
        #sub-tab-lost.active, #me-tab-lost.active { border-color: #fb7185; color: #fb7185; background: rgba(244, 63, 94, 0.1); }
        #sub-tab-fnew.active { border-color: #60a5fa; color: #60a5fa; background: rgba(59, 130, 246, 0.1); }
        #me-tab-not-back.active { border-color: #f59e0b; color: #f59e0b; background: rgba(245, 158, 11, 0.1); }

        .arq-content { padding: 0 20px 20px 20px; }
        .arq-input { 
            width: 100%; padding: 12px; 
            background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15); 
            color: #fff; border-radius: 10px; margin-bottom: 10px; 
            outline: none; box-sizing: border-box; font-family: inherit; 
            transition: all 0.3s ${EASE_SMOOTH};
        }
        .arq-input:focus { border-color: #ff003c; box-shadow: 0 0 0 2px rgba(255, 0, 60, 0.2); }

        .btn-primary { 
            width: 100%; padding: 14px; margin-bottom: 20px; border: none; 
            background: linear-gradient(135deg, #ff003c 0%, #ff6a00 100%); 
            color: #fff; font-weight: 800; cursor: pointer; border-radius: 10px; 
            font-size: 11px; letter-spacing: 0.5px; 
            transition: all 0.3s ${EASE_SMOOTH};
            box-shadow: 0 8px 20px rgba(255, 0, 60, 0.3); text-transform: uppercase;
        }
        .btn-primary:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 35px rgba(255, 0, 60, 0.4); }
        .btn-primary:active { transform: translateY(-1px) scale(0.98); }

        .btn-secondary {
            width: 100%; padding: 10px; margin-top: 10px;
            background: transparent; border: 1px solid rgba(255,255,255,0.1);
            color: #64748b; font-size: 10px; font-weight: 600; border-radius: 8px;
            cursor: pointer; 
            transition: all 0.3s ${EASE_SMOOTH};
            display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .btn-secondary:hover { border-color: #ff003c; color: #fff; background: rgba(255, 0, 60, 0.05); }
        .btn-secondary svg { width: 14px; fill: currentColor; transition: transform 0.3s ease; }
        .btn-secondary:hover svg { transform: rotate(-15deg); }

        .arq-status { font-size: 10px; color: #94a3b8; margin-bottom: 15px; text-align: center; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: color 0.3s ease; }

        .side-content { padding: 10px; height: calc(100% - 40px); overflow-y: auto; }
        
        .arq-item { 
            display: flex; align-items: center; margin-bottom: 8px; 
            background: rgba(255,255,255,0.03); padding: 10px; 
            border-radius: 10px; 
            transition: all 0.3s ${EASE_SMOOTH};
            border: 1px solid rgba(255,255,255,0.05); 
        }
        .arq-item:hover { background: rgba(255,255,255,0.08); transform: translateX(5px); border-color: rgba(255,255,255,0.15); }
        .arq-link { display: flex; align-items: center; text-decoration: none; color: inherit; flex-grow: 1; }
        .arq-link img { width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; object-fit: cover; background: #1e293b; transition: transform 0.3s ease; }
        .arq-item:hover img { transform: scale(1.1); }
        .arq-info { display: flex; flex-direction: column; }
        
        .arq-user-row { display: flex; align-items: center; gap: 4px; }
        .arq-user { font-weight: 700; font-size: 13px; color: #f1f5f9; }
        .verified-icon { width: 14px; height: 14px; fill: #38bdf8; } 
        
        .arq-date { font-size: 10px; color: #64748b; margin-top: 2px; }

        .arq-letter-header {
            font-size: 12px; font-weight: 800; color: #ff003c;
            padding: 8px 4px; margin-top: 10px; margin-bottom: 5px;
            border-bottom: 1px solid rgba(255, 0, 60, 0.2);
            text-transform: uppercase; letter-spacing: 1px;
        }

        .saved-targets-area { 
            display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; 
            max-height: 85px; overflow-y: auto; padding: 4px 0;
        }
        .saved-chip { 
            background: rgba(255,255,255,0.08); 
            padding: 4px 10px 4px 4px; 
            border-radius: 20px; 
            font-size: 11px; display: flex; align-items: center; cursor: pointer; color: #cbd5e1;
            transition: all 0.3s ${EASE_SMOOTH};
            border: 1px solid transparent;
        }
        .saved-chip:hover { background: rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.4); color: #fff; transform: translateY(-2px); }
        .saved-chip-img {
            width: 20px; height: 20px; border-radius: 50%; margin-right: 6px;
            object-fit: cover; background: #334155;
        }
        .chip-del { margin-left: 6px; color: #94a3b8; font-weight: bold; transition: color 0.2s ease; }
        .chip-del:hover { color: #ef4444; }

        .hidden { display: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; transition: background 0.3s ease; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
    `;
    const style = document.createElement('style'); style.innerHTML = css; document.head.appendChild(style);

    const mainDiv = document.createElement('div');
    mainDiv.id = 'arq-tracker-panel';
    mainDiv.innerHTML = `
        <div class="arq-header" id="arq-header-drag">
            <h2>ArqSEXE 13.2</h2>
            <button id="btn-minimize" class="min-btn">
                <svg viewBox="0 0 24 24"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>
        <div class="arq-main-tabs">
            <div id="tab-me" class="arq-tab active">Meus Unfollows</div>
            <div id="tab-stalker" class="arq-tab">Stalker</div>
        </div>
        <div class="arq-content">
            <div id="stalker-ui" class="hidden">
                <div id="stalker-avatar-area" class="stalker-avatar-container">
                    <img id="stalker-img-display" class="stalker-img" src="">
                </div>
                
                <input type="text" id="stalker-target" class="arq-input" placeholder="@usuario_alvo">
                
                <div id="saved-targets-list" class="saved-targets-area"></div>

                <button id="btn-stalk" class="btn-primary">Iniciar Monitoramento</button>
                <div class="sub-tabs">
                    <div id="sub-tab-new" class="sub-tab">Começou<br>a seguir</div>
                    <div id="sub-tab-lost" class="sub-tab">Deixou<br>de seguir</div>
                    <div id="sub-tab-fnew" class="sub-tab">Novo<br>Seguidor</div>
                </div>
            </div>

            <div id="me-ui">
                <button id="btn-scan" class="btn-primary">ESCANEAR MUDANÇAS (COMPLETO)</button>
                <div class="sub-tabs">
                    <div id="me-tab-new" class="sub-tab">Novos<br>Fãs</div>
                    <div id="me-tab-lost" class="sub-tab">Deixaram<br>de Seguir</div>
                    <div id="me-tab-not-back" class="sub-tab">Traidores<br>(Não seguem)</div>
                </div>
            </div>
            
            <div id="arq-status" class="arq-status">Sistema Pronto</div>
            <button id="btn-clear-hist" class="btn-secondary">
                <svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                Limpar Dados (Liberar Memória)
            </button>
        </div>
    `;
    document.body.appendChild(mainDiv);

    const sideDiv = document.createElement('div');
    sideDiv.id = 'arq-side-panel';
    sideDiv.innerHTML = `
        <div class="side-header">
            <span class="side-title" id="side-title-text">Resultados</span>
            <div class="side-actions">
                <button class="min-btn" id="btn-filter-verified" title="Ocultar Verificados">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="none" fill="currentColor"/></svg>
                </button>
                <button class="min-btn" id="btn-close-side">
                    <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
            </div>
        </div>
        <div class="side-content" id="arq-result-list"></div>
    `;
    document.body.appendChild(sideDiv);

    const panel = document.getElementById('arq-tracker-panel');
    const sidePanel = document.getElementById('arq-side-panel');
    const header = document.getElementById('arq-header-drag');
    
    let isDragging = false, startX, startY, initialLeft, initialTop;

    const updateSidePosition = () => {
        const rect = panel.getBoundingClientRect();
        sidePanel.style.top = `${rect.top}px`;
        sidePanel.style.left = `${rect.right + 10}px`; 
    };
    updateSidePosition();

    header.addEventListener('mousedown', (e) => {
        if(e.target.closest('.min-btn')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = panel.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        header.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const newLeft = initialLeft + dx;
        const newTop = initialTop + dy;
        panel.style.left = `${newLeft}px`;
        panel.style.top = `${newTop}px`;
        sidePanel.style.left = `${newLeft + panel.offsetWidth + 10}px`;
        sidePanel.style.top = `${newTop}px`;
    });

    document.addEventListener('mouseup', () => { isDragging = false; header.style.cursor = 'grab'; });

    let currentMode = 'me'; 
    let currentSubTab = ''; 
    let savedTargets = JSON.parse(localStorage.getItem('arq_saved_targets')) || [];
    let notBackList = []; 
    let filterVerified = false; 

    const toggleSidePanel = (show) => {
        if(show) {
            sidePanel.classList.add('open');
            updateSidePosition(); 
        } else {
            sidePanel.classList.remove('open');
            document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
            currentSubTab = '';
        }
    };

    document.getElementById('btn-close-side').onclick = () => toggleSidePanel(false);

    document.getElementById('btn-filter-verified').onclick = (e) => {
        filterVerified = !filterVerified;
        e.currentTarget.classList.toggle('active-filter', filterVerified);
        updateUI(); 
    };

    const updateUI = () => {
        if(!currentSubTab) return; 

        const target = currentMode === 'me' ? 'me' : document.getElementById('stalker-target').value.replace('@','');
        const histKey = `arq_hist_${target}`;
        const history = JSON.parse(localStorage.getItem(histKey)) || { new: [], lost: [], f_new: [] };
        
        let list = [];
        let title = "Resultados";

        if(currentSubTab === 'new' || currentSubTab === 'me-new') {
            list = history.new || [];
            title = "Começou a Seguir";
        } else if(currentSubTab === 'lost' || currentSubTab === 'me-lost') {
            list = history.lost || [];
            title = "Deixou de Seguir";
        } else if(currentSubTab === 'fnew') {
            list = history.f_new || [];
            title = "Novos Seguidores";
        } else if(currentSubTab === 'me-not-back') {
            list = notBackList; 
            title = "Não te seguem de volta";
        }

        if(filterVerified) {
            list = list.filter(u => !u.is_verified);
        }

        document.getElementById('side-title-text').innerText = `${title} (${list.length})`;
        
        let html = list.length > 0 ? "" : `<div style="text-align:center;color:#64748b;font-size:12px;padding:30px;font-weight:500;">Nenhum registro encontrado.</div>`;
        
        let items = [];
        
        if (currentSubTab === 'me-not-back') {
            items = [...list].sort((a, b) => a.user.localeCompare(b.user));
        } else {
            items = [...list].reverse();
        }

        let lastLetter = "";

        items.forEach((u, index) => {
            const delay = Math.min(index * 0.05, 1); 
            const dateStr = u.date ? `<span class="arq-date">${u.date}</span>` : '';
            
            if (currentSubTab === 'me-not-back') {
                const currentLetter = u.user.charAt(0).toUpperCase();
                if (currentLetter !== lastLetter) {
                    html += `<div class="arq-letter-header" style="animation: slideIn 0.3s ${EASE_SMOOTH} ${delay}s backwards;">${currentLetter}</div>`;
                    lastLetter = currentLetter;
                }
            }

            const verifiedBadge = u.is_verified ? 
                `<svg class="verified-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>` 
                : '';

            html += `
                <div class="arq-item" style="animation: slideIn 0.3s ${EASE_SMOOTH} ${delay}s backwards;">
                    <a href="/${u.user}" target="_blank" class="arq-link">
                        <img src="${u.pic}">
                        <div class="arq-info">
                            <div class="arq-user-row">
                                <span class="arq-user">${u.user}</span>
                                ${verifiedBadge}
                            </div>
                            ${dateStr}
                        </div>
                    </a>
                </div>
            `;
        });
        document.getElementById('arq-result-list').innerHTML = html;
        toggleSidePanel(true);
    };

    const keyframes = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    const styleKeyframes = document.createElement('style');
    styleKeyframes.innerHTML = keyframes;
    document.head.appendChild(styleKeyframes);

    const setTab = (tabName) => {
        if(currentSubTab === tabName) {
            toggleSidePanel(false);
            return;
        }
        currentSubTab = tabName;
        document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
        
        let activeBtnId = '';
        if(currentMode === 'me') {
            if(tabName === 'me-new') activeBtnId = 'me-tab-new';
            if(tabName === 'me-lost') activeBtnId = 'me-tab-lost';
            if(tabName === 'me-not-back') activeBtnId = 'me-tab-not-back';
        } else {
            if(tabName === 'new') activeBtnId = 'sub-tab-new';
            if(tabName === 'lost') activeBtnId = 'sub-tab-lost';
            if(tabName === 'fnew') activeBtnId = 'sub-tab-fnew';
        }
        if(activeBtnId) document.getElementById(activeBtnId).classList.add('active');
        
        updateUI();
    };

    document.getElementById('sub-tab-new').onclick = () => setTab('new');
    document.getElementById('sub-tab-lost').onclick = () => setTab('lost');
    document.getElementById('sub-tab-fnew').onclick = () => setTab('fnew');
    document.getElementById('me-tab-new').onclick = () => setTab('me-new');
    document.getElementById('me-tab-lost').onclick = () => setTab('me-lost');
    document.getElementById('me-tab-not-back').onclick = () => setTab('me-not-back');

    document.getElementById('tab-me').onclick = () => { currentMode = 'me'; switchMainTab(); };
    document.getElementById('tab-stalker').onclick = () => { currentMode = 'stalker'; switchMainTab(); };

    const switchMainTab = () => {
        document.getElementById('tab-me').classList.toggle('active', currentMode === 'me');
        document.getElementById('tab-stalker').classList.toggle('active', currentMode === 'stalker');
        document.getElementById('me-ui').classList.toggle('hidden', currentMode !== 'me');
        document.getElementById('stalker-ui').classList.toggle('hidden', currentMode !== 'stalker');
        toggleSidePanel(false); 
        if(currentMode === 'stalker') renderSavedTargets();
    };

    document.getElementById('btn-minimize').onclick = (e) => {
        e.stopPropagation();
        const panel = document.getElementById('arq-tracker-panel');
        panel.classList.toggle('minimized');
        toggleSidePanel(false);
    };

    const renderSavedTargets = () => {
        const container = document.getElementById('saved-targets-list');
        container.innerHTML = "";
        if (savedTargets.length === 0) { container.style.display = 'none'; return; }
        container.style.display = 'flex';
        savedTargets.forEach((targetObj, index) => {
            const targetName = typeof targetObj === 'string' ? targetObj : targetObj.user;
            const targetPic = typeof targetObj === 'string' ? '' : targetObj.pic;
            
            const imgHtml = targetPic ? `<img src="${targetPic}" class="saved-chip-img">` : `<div class="saved-chip-img" style="display:none"></div>`;

            const chip = document.createElement('div');
            chip.className = 'saved-chip';
            chip.style.animation = `slideIn 0.3s ${EASE_SMOOTH} ${index * 0.05}s backwards`;
            chip.innerHTML = `${imgHtml}<span class="chip-name">${targetName}</span> <span class="chip-del">×</span>`;
            
            chip.onclick = () => { document.getElementById('stalker-target').value = targetName; runLogic('stalk'); };
            chip.querySelector('.chip-del').onclick = (e) => {
                e.stopPropagation(); 
                if(confirm(`Deseja remover ${targetName} e APAGAR todos os seus dados salvos?`)) {
                    savedTargets = savedTargets.filter(t => (typeof t === 'string' ? t : t.user) !== targetName);
                    localStorage.setItem('arq_saved_targets', JSON.stringify(savedTargets));
                    localStorage.removeItem(`arq_db_${targetName}`);
                    localStorage.removeItem(`arq_hist_${targetName}`);
                    renderSavedTargets();
                }
            };
            container.appendChild(chip);
        });
    };
    
    const saveTarget = (targetName, picUrl) => {
        const exists = savedTargets.some(t => (typeof t === 'string' ? t : t.user) === targetName);
        if (!exists) {
            savedTargets.push({ user: targetName, pic: picUrl });
            localStorage.setItem('arq_saved_targets', JSON.stringify(savedTargets));
            renderSavedTargets();
        }
    };

    const showStalkerAvatar = (url) => {
        const container = document.getElementById('stalker-avatar-area');
        const img = document.getElementById('stalker-img-display');
        if(url) {
            img.src = url;
            container.classList.add('visible');
        } else {
            container.classList.remove('visible');
        }
    };

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const updateStatus = (msg, color = '#94a3b8') => {
        const el = document.getElementById('arq-status');
        el.innerText = msg;
        el.style.color = color;
    };
    const getCookie = (b) => { let c = `; ${document.cookie}`, a = c.split(`; ${b}=`); if (2 === a.length) return a.pop().split(";").shift(); };

    async function scanGraph(userId, type) {
        let list = [];
        let hasNext = true;
        let cursor = "";
        let requestCount = 0;
        const hash = type === 'following' ? '3dec7e2c57367ef3da3d987d89f9dbc8' : 'c76146de99bb02f6415203be841dd25a';
        const edge = type === 'following' ? 'edge_follow' : 'edge_followed_by';

        while(hasNext) {
            requestCount++;
            if(requestCount % 20 === 0) {
                updateStatus(`Resfriando motor (5s)...`, '#fbbf24');
                await sleep(5000); 
            }

            let url = `https://www.instagram.com/graphql/query/?query_hash=${hash}&variables={"id":"${userId}","include_reel":true,"fetch_mutual":false,"first":50,"after":"${cursor}"}`;
            let res = await fetch(url);
            let json = await res.json();
            
            if(!json.data) throw new Error("Bloqueio temporário do IG");

            let data = json.data.user[edge];
            
            data.edges.forEach(e => {
                 list.push({ 
                     id: e.node.id, 
                     user: e.node.username, 
                     pic: e.node.profile_pic_url, 
                     follows_viewer: e.node.follows_viewer,
                     is_verified: e.node.is_verified 
                 });
            });
            hasNext = data.page_info.has_next_page;
            cursor = data.page_info.end_cursor;
            updateStatus(`${type === 'following' ? 'Lendo seguindo' : 'Lendo seguidores'}: ${list.length}`, '#38bdf8');
            
            await sleep(300); 
        }
        return list;
    }

    async function runLogic(mode) {
        const targetInput = document.getElementById('stalker-target').value.replace('@','');
        const isStalker = mode === 'stalk';
        const target = isStalker ? targetInput : 'me';
        
        if(isStalker && !target) return alert("Digite o usuário");
        
        updateStatus("Iniciando...", '#fff');
        toggleSidePanel(false); 
        showStalkerAvatar(null); 

        try {
            let userId = "";
            let isMyProfile = false;
            const myId = getCookie("ds_user_id");

            if(!isStalker) {
                userId = myId;
                isMyProfile = true;
            } else {
                const res = await fetch(`https://www.instagram.com/web/search/topsearch/?context=blended&query=${target}`);
                const data = await res.json();
                const user = data.users.find(u => u.user.username === target);
                
                if(user && user.user.pk === myId) {
                    userId = myId;
                    isMyProfile = true; 
                    updateStatus("Perfil próprio detectado...", '#fff');
                    showStalkerAvatar(user.user.profile_pic_url);
                    saveTarget(target, user.user.profile_pic_url);
                } else if(user) {
                    userId = user.user.pk;
                    saveTarget(target, user.user.profile_pic_url);
                    showStalkerAvatar(user.user.profile_pic_url);
                } else {
                    throw new Error("Usuário não encontrado");
                }
            }

            const DB_KEY = `arq_db_${target}`;
            const HIST_KEY = `arq_hist_${target}`;
            const rawDB = localStorage.getItem(DB_KEY);
            const isFirstTime = !rawDB; 
            let oldDB = JSON.parse(rawDB);
            if (!oldDB || !Array.isArray(oldDB.following) || !Array.isArray(oldDB.followers)) {
                oldDB = { following: [], followers: [] };
            }
            let history = JSON.parse(localStorage.getItem(HIST_KEY)) || { new: [], lost: [], f_new: [] };
            const now = new Date().toLocaleString('pt-BR');

            updateStatus("Lendo quem segue...", '#fff');
            const rawFollowing = await scanGraph(userId, 'following');
            const followingList = rawFollowing; 

            if(isMyProfile) {
                notBackList = rawFollowing.filter(u => !u.follows_viewer);
            }

            if(oldDB.following.length > 0) {
                const newF = followingList.filter(n => !oldDB.following.some(o => o.id === n.id));
                const lostF = oldDB.following.filter(o => !followingList.some(n => n.id === o.id));
                newF.forEach(u => history.new.push({ ...u, date: now }));
                lostF.forEach(u => history.lost.push({ ...u, date: now }));
            }
            
            let followersList = [];
            if(isStalker) {
                updateStatus("Lendo fãs...", '#fff');
                followersList = await scanGraph(userId, 'followers');
                
                if(oldDB.followers.length > 0) {
                    const newFol = followersList.filter(n => !oldDB.followers.some(o => o.id === n.id));
                    newFol.forEach(u => history.f_new.push({ ...u, date: now }));
                }
            }

            oldDB.following = followingList;
            if(isStalker) oldDB.followers = followersList;

            try {
                localStorage.setItem(HIST_KEY, JSON.stringify(history));
                localStorage.setItem(DB_KEY, JSON.stringify(oldDB));
            } catch (storageError) {
                if (storageError.name === 'QuotaExceededError' || storageError.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    updateStatus("ERRO: MEMÓRIA CHEIA! Limpe os dados.", "#f87171");
                    alert("Atenção: O armazenamento do navegador lotou!\n\nEste perfil é muito grande. Para continuar usando o script, clique em 'Limpar Dados' e tente novamente em perfis menores.");
                    return;
                }
                throw storageError;
            }
            
            if(isFirstTime) updateStatus("✨ Banco Criado! ✨", "#34d399");
            else updateStatus("Concluído", "#34d399");
            
            if(currentMode === 'me') {
                if(notBackList.length > 0) setTab('me-not-back');
                else if(history.new.length > 0) setTab('me-new');
                else if(history.lost.length > 0) setTab('me-lost');
            } else {
                if(history.new.length > 0) setTab('new');
                else if(history.lost.length > 0) setTab('lost');
                else if(history.f_new.length > 0) setTab('fnew');
            }

        } catch(e) { 
            console.error(e);
            updateStatus("Erro: Tente mais tarde", "#f87171"); 
            alert("Erro de conexão ou bloqueio temporário do Instagram.");
        }
    }

    document.getElementById('btn-scan').onclick = () => runLogic('me');
    document.getElementById('btn-stalk').onclick = () => runLogic('stalk');
    
    document.getElementById('btn-clear-hist').onclick = () => {
        if(confirm("Deseja apagar TODOS os dados de TODAS as pessoas que você já escaneou (formatação geral)?")) {
            Object.keys(localStorage).forEach(k => { 
                if(k.startsWith('arq_')) localStorage.removeItem(k); 
            });
            savedTargets = [];
            notBackList = [];
            renderSavedTargets();
            document.getElementById('arq-result-list').innerHTML = '';
            toggleSidePanel(false);
            updateStatus("TODOS OS DADOS APAGADOS!", "#34d399");
        }
    };

    renderSavedTargets();
})();