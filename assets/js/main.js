(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const search = document.querySelector('#post-search');
  const posts = Array.from(document.querySelectorAll('[data-post]'));
  if (!search) return;
  const categories = Array.from(document.querySelectorAll('[data-category].filter-button'));
  const tags = Array.from(document.querySelectorAll('.tag-filter'));
  const status = document.querySelector('#search-status');
  const empty = document.querySelector('#no-results');
  const initial = new URLSearchParams(location.search);
  let selectedCategory = (initial.get('category') || '').toLowerCase();
  let selectedTag = (initial.get('tag') || '').toLowerCase();

  function syncFilterUrl() {
    const params = new URLSearchParams(location.search);
    if (selectedCategory) params.set('category', selectedCategory);
    else params.delete('category');
    if (selectedTag) params.set('tag', selectedTag);
    else params.delete('tag');
    const query = params.toString();
    history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${location.hash}`);
  }

  function update() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    posts.forEach(post => {
      const postCategories = JSON.parse(post.dataset.categories || '[]').map(value => String(value).toLowerCase());
      const postTags = JSON.parse(post.dataset.tags || '[]').map(value => String(value).toLowerCase());
      const text = `${post.dataset.search || ''} ${postCategories.join(' ')} ${postTags.join(' ')}`;
      const categoryMatch = !selectedCategory || postCategories.includes(selectedCategory);
      const tagMatch = !selectedTag || postTags.includes(selectedTag);
      const show = (!query || text.includes(query)) && categoryMatch && tagMatch;
      post.hidden = !show;
      if (show) visible += 1;
    });
    categories.forEach(button => {
      const selected = button.dataset.category === selectedCategory;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    tags.forEach(button => button.classList.toggle('is-active', button.dataset.tag === selectedTag));
    if (status) status.textContent = (query || selectedCategory || selectedTag) ? `검색된 기록 ${visible}개${selectedTag ? ` · #${selectedTag}` : ''}` : '';
    if (empty) empty.hidden = visible !== 0 || posts.length === 0;
  }
  search.addEventListener('input', update);
  categories.forEach(button => button.addEventListener('click', () => {
    selectedCategory = button.dataset.category || '';
    selectedTag = '';
    syncFilterUrl();
    update();
    if (button.classList.contains('side-category')) document.querySelector('#stories')?.scrollIntoView({behavior: 'smooth'});
  }));
  tags.forEach(button => button.addEventListener('click', () => {
    selectedTag = selectedTag === button.dataset.tag ? '' : button.dataset.tag;
    selectedCategory = '';
    syncFilterUrl();
    update();
    document.querySelector('#stories')?.scrollIntoView({behavior: 'smooth'});
  }));
  update();
})();

(() => {
  document.querySelectorAll('[data-local-date]').forEach(node => {
    const date = new Date(node.dataset.localDate);
    if (Number.isNaN(date.getTime())) return;
    node.textContent = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric',
      weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false
    }).format(date);
  });
})();


(() => {
  const list = document.querySelector('.posts-list');
  const posts = Array.from(document.querySelectorAll('[data-post]'));
  const sortButtons = Array.from(document.querySelectorAll('[data-sort]'));
  if (list && posts.length) {
    const sort = order => {
      posts.sort((a, b) => {
        const diff = a.dataset.date.localeCompare(b.dataset.date);
        return order === 'oldest' ? diff : -diff;
      }).forEach(post => list.appendChild(post));
      sortButtons.forEach(button => button.classList.toggle('is-active', button.dataset.sort === order));
    };
    sortButtons.forEach(button => button.addEventListener('click', () => sort(button.dataset.sort)));
    sort('newest');
  }
})();

(() => {
  const calendar = document.querySelector('[data-calendar]');
  if (!calendar) return;
  const grid = calendar.querySelector('[data-calendar-grid]');
  const title = calendar.querySelector('[data-calendar-title]');
  const dates = new Set(Array.from(document.querySelectorAll('[data-post]')).map(post => post.dataset.date));
  let cursor = new Date();
  cursor.setDate(1);
  const render = () => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    title.textContent = `${year}년 ${month + 1}월`;
    grid.replaceChildren();
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < first; i += 1) grid.appendChild(document.createElement('span'));
    for (let day = 1; day <= days; day += 1) {
      const cell = document.createElement('span');
      const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      cell.textContent = String(day);
      cell.className = dates.has(key) ? 'has-post' : '';
      if (dates.has(key)) cell.title = '이 날 포스팅이 있습니다';
      grid.appendChild(cell);
    }
  };
  calendar.querySelector('[data-calendar-prev]')?.addEventListener('click', () => { cursor.setMonth(cursor.getMonth() - 1); render(); });
  calendar.querySelector('[data-calendar-next]')?.addEventListener('click', () => { cursor.setMonth(cursor.getMonth() + 1); render(); });
  render();
})();
