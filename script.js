    const themeBtn = document.getElementById('themeBtn');
    const root = document.documentElement;
    let accentIdx = 0;
    const accents = [
      {a:'#7cf7ff', b:'#8a6cff'}, 
      {a:'#ff8a7c', b:'#ffd36f'}, 
      {a:'#7cf78f', b:'#5ef7b2'}  
    ];
    themeBtn.addEventListener('click', () => {
      accentIdx = (accentIdx + 1) % accents.length;
      const ac = accents[accentIdx];
      root.style.setProperty('--accent', ac.a);
      root.style.setProperty('--accent-2', ac.b);
    });

    const collapseBtn = document.getElementById('collapseBtn');
    const sidebar = document.getElementById('sidebar');
    let collapsed = false;
    collapseBtn.addEventListener('click', () => {
      collapsed = !collapsed;
      if(collapsed){
        sidebar.style.width = '62px';
        sidebar.style.minWidth = '62px';
        collapseBtn.querySelector('span').textContent = 'Show';
      } else {
        sidebar.style.width = '84px';
        sidebar.style.minWidth = '84px';
        collapseBtn.querySelector('span').textContent = 'Hide';
      }
    });

    function animateCount(el, target, duration = 1400) {
      const start = performance.now();
      const initial = parseInt(el.textContent.replace(/\D/g,'')) || 0;
      const diff = target - initial;
      function tick(now){
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.floor(initial + diff * eased);
        el.textContent = value.toLocaleString();
        if(t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const statEls = document.querySelectorAll('.stat-number');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const el = entry.target;
          const target = parseInt(el.dataset.target) || 0;
          animateCount(el, target, 1500 + Math.random()*800);
          io.unobserve(el);
        }
      });
    }, {threshold:0.3});

    statEls.forEach(el => io.observe(el));

    setInterval(() => {
      const el = document.querySelector('.stat-number[data-target]');
      if(!el) return;
      const base = parseInt(el.dataset.target);
      const newTarget = base + Math.round((Math.random()*40)-10);
      el.dataset.target = Math.max(0, newTarget);
      animateCount(el, parseInt(el.dataset.target), 900);
    }, 8000);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(mq.matches){
      document.querySelectorAll('.card').forEach(c => {
        c.style.transition = 'none';
      });
    }
