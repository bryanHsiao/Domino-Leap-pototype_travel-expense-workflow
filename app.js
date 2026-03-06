// ============================================================
// Leap 出差及報支系統 - Mobile-First UI Prototype
// ============================================================

let currentRole = '';
let currentPage = 'dashboard';

// --- Demo Data ---
const allRecords = [
  { id: 'BTO20260301-001', name: '王小明', dept: '資訊部', region: '國內', regionClass: 'blue', dest: '台中', startDate: '2026/03/10', endDate: '2026/03/12', days: 3, status: '主管審核中', statusClass: 'pending', amount: 3500 },
  { id: 'BTO20260228-012', name: '李小華', dept: '業務部', region: '國外', regionClass: 'purple', dest: '東京', startDate: '2026/03/15', endDate: '2026/03/19', days: 5, status: '出差中/待報支', statusClass: 'expense', amount: 45200 },
  { id: 'BTO20260225-008', name: '張大方', dept: '業務部', region: '國內', regionClass: 'blue', dest: '高雄', startDate: '2026/03/01', endDate: '2026/03/03', days: 3, status: '已結案', statusClass: 'closed', amount: 12800 },
  { id: 'BTO20260220-005', name: '陳美玲', dept: '業務部', region: '國外', regionClass: 'purple', dest: '上海', startDate: '2026/02/25', endDate: '2026/02/28', days: 4, status: '財務審核中', statusClass: 'finance', amount: 38000 },
  { id: 'BTO20260305-002', name: '林志偉', dept: '研發部', region: '國內', regionClass: 'blue', dest: '新竹', startDate: '2026/03/08', endDate: '2026/03/08', days: 1, status: '主管審核中', statusClass: 'pending', amount: 0 },
  { id: 'BTO20260225-003', name: '王小明', dept: '資訊部', region: '國外', regionClass: 'purple', dest: '東京', startDate: '2026/03/05', endDate: '2026/03/08', days: 4, status: '出差中/待報支', statusClass: 'expense', amount: 0 },
  { id: 'BTO20260210-007', name: '王小明', dept: '資訊部', region: '國內', regionClass: 'blue', dest: '新竹', startDate: '2026/02/15', endDate: '2026/02/15', days: 1, status: '已結案', statusClass: 'closed', amount: 1200 },
  { id: 'BTO20260130-002', name: '王小明', dept: '資訊部', region: '國內', regionClass: 'blue', dest: '高雄', startDate: '2026/02/03', endDate: '2026/02/05', days: 3, status: '已結案', statusClass: 'closed', amount: 8500 },
];

const pendingReviews = [
  { id: 'BTO20260301-001', name: '王小明', dept: '資訊部', region: '國內', regionClass: 'blue', dest: '台中', date: '03/10 ~ 03/12', status: '待行程審核', statusClass: 'pending' },
  { id: 'BTO20260228-015', name: '陳美玲', dept: '業務部', region: '國外', regionClass: 'purple', dest: '上海', date: '02/25 ~ 02/28', status: '待費用審核', statusClass: 'finance', amount: '$38,000' },
  { id: 'BTO20260305-002', name: '林志偉', dept: '研發部', region: '國內', regionClass: 'blue', dest: '新竹', date: '03/08', status: '待行程審核', statusClass: 'pending' },
];

const roleConfig = {
  employee: { name: '王小明', title: '資訊部 / 工程師', avatar: '王' },
  manager:  { name: '張部長', title: '資訊部 / 部長',   avatar: '張' },
  finance:  { name: '林會計', title: '財務部 / 會計',   avatar: '林' },
  admin:    { name: '周管理', title: '管理部 / 管理師', avatar: '周' },
};

// --- Role Selection ---
function selectRole(role) {
  currentRole = role;
  document.getElementById('roleModal').classList.add('hidden');
  document.getElementById('appShell').classList.remove('hidden');

  const info = roleConfig[role];
  document.getElementById('userName').textContent = info.name;
  document.getElementById('userAvatar').textContent = info.avatar;
  // Desktop sidebar user info
  const dName = document.getElementById('userNameDesktop');
  const dRole = document.getElementById('userRoleDesktop');
  const dAvatar = document.getElementById('userAvatarDesktop');
  if (dName) dName.textContent = info.name;
  if (dRole) dRole.textContent = info.title;
  if (dAvatar) dAvatar.textContent = info.avatar;

  // Update form applicant name
  const formApp = document.getElementById('formApplicant');
  if (formApp) formApp.value = info.name;

  // Show/hide desktop sidebar nav items based on role
  document.querySelectorAll('[data-role="applicant"]').forEach(el => {
    el.style.display = (role === 'employee' || role === 'manager') ? '' : 'none';
  });
  document.querySelectorAll('[data-role="my-apps"]').forEach(el => {
    el.style.display = (role === 'employee' || role === 'manager') ? '' : 'none';
  });
  document.querySelectorAll('[data-role="approver"]').forEach(el => {
    el.style.display = (role === 'manager' || role === 'finance') ? '' : 'none';
  });
  document.querySelectorAll('[data-role="all-records"]').forEach(el => {
    el.style.display = (role === 'finance' || role === 'admin') ? '' : 'none';
  });
  document.querySelectorAll('[data-role="admin"]').forEach(el => {
    el.style.display = role === 'admin' ? '' : 'none';
  });

  // New Application button visibility (only for applicant roles)
  const newAppBtn = document.getElementById('newAppBtn');
  if (newAppBtn) newAppBtn.style.display = (role === 'employee' || role === 'manager') ? 'flex' : 'none';

  // Build bottom tabs
  buildBottomTabs(role);

  // Update dashboard
  updateDashboard(role);

  navigateTo('dashboard');
}

function logout() {
  document.getElementById('roleModal').classList.remove('hidden');
  document.getElementById('appShell').classList.add('hidden');
  currentRole = '';
}

// --- Bottom Tab Bar ---
function buildBottomTabs(role) {
  const container = document.getElementById('tabButtons');
  let tabs = [];

  tabs.push({ page: 'dashboard', label: '首頁', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>' });

  if (role === 'employee' || role === 'manager') {
    tabs.push({ page: 'myApplications', label: '我的申請', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>' });
  }

  if (role === 'manager' || role === 'finance') {
    tabs.push({ page: 'pendingApprovals', label: '待審核', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>', badge: '3' });
  }

  if (role === 'finance' || role === 'admin') {
    tabs.push({ page: 'allRecords', label: '全部紀錄', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>' });
  }

  if (role === 'admin') {
    tabs.push({ page: 'hrManagement', label: 'HR管理', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' });
  }

  container.innerHTML = tabs.map(t => `
    <button onclick="navigateTo('${t.page}')" data-tab="${t.page}" class="tab-btn">
      ${t.icon}
      <span>${t.label}</span>
      ${t.badge ? `<span class="tab-badge">${t.badge}</span>` : ''}
    </button>
  `).join('');
}

// --- Navigation ---
const pageTitles = {
  dashboard: '首頁',
  newApplication: '新增出差申請',
  myApplications: '我的申請',
  pendingApprovals: '待審核',
  allRecords: '全部紀錄',
  viewApplication: '申請詳情',
  reviewApplication: '審核申請',
  hrManagement: 'HR 人員管理',
};

function navigateTo(page, id) {
  currentPage = page;

  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.remove('hidden');
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = '';
  }

  document.getElementById('pageTitle').textContent = pageTitles[page] || page;

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.nav === page) btn.classList.add('active');
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === page) btn.classList.add('active');
  });

  // Hide new app button when not on dashboard
  const newAppBtn = document.getElementById('newAppBtn');
  if (newAppBtn) {
    newAppBtn.style.display = (page === 'dashboard' && (currentRole === 'employee' || currentRole === 'manager')) ? 'flex' : 'none';
  }

  document.querySelector('main').scrollTop = 0;
}

// --- Dashboard ---
function updateDashboard(role) {
  const myName = roleConfig[role]?.name;
  let records;

  if (role === 'employee') {
    records = allRecords.filter(r => r.name === myName);
  } else if (role === 'manager') {
    records = allRecords.filter(r => r.name === myName || r.statusClass === 'pending');
  } else {
    records = allRecords;
  }

  const total = records.length;
  const pending = records.filter(r => r.statusClass === 'pending' || r.statusClass === 'finance').length;
  const approved = records.filter(r => r.statusClass === 'closed' || r.statusClass === 'approved').length;
  const totalAmount = records.reduce((sum, r) => sum + (r.amount || 0), 0);

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statApproved').textContent = approved;
  document.getElementById('statAmount').textContent = '$' + totalAmount.toLocaleString();

  const titleEl = document.getElementById('dashboardCardTitle');
  const viewAllBtn = document.getElementById('dashboardViewAll');

  if (role === 'employee') {
    titleEl.textContent = '我的申請紀錄';
    viewAllBtn.textContent = '查看全部';
    viewAllBtn.onclick = () => navigateTo('myApplications');
  } else if (role === 'manager') {
    titleEl.textContent = '待審核案件';
    viewAllBtn.textContent = '查看全部';
    viewAllBtn.onclick = () => navigateTo('pendingApprovals');
    records = pendingReviews;
  } else if (role === 'finance') {
    titleEl.textContent = '待審核案件';
    viewAllBtn.textContent = '查看全部';
    viewAllBtn.onclick = () => navigateTo('pendingApprovals');
    records = pendingReviews.filter(r => r.statusClass === 'finance');
  } else {
    titleEl.textContent = '全部申請紀錄';
    viewAllBtn.textContent = '查看全部';
    viewAllBtn.onclick = () => navigateTo('allRecords');
  }

  renderRecordCards('dashboardCards', records, role);
  renderMyAppsCards();
  renderPendingCards();
  renderAllRecordCards();
}

// --- Card Rendering ---
function renderRecordCards(containerId, records, role) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (records.length === 0) {
    container.innerHTML = '<div class="text-center text-gray-400 text-sm py-8">目前沒有紀錄</div>';
    return;
  }

  container.innerHTML = records.map(r => {
    const clickTarget = (role === 'manager' || role === 'finance') && (r.statusClass === 'pending' || r.statusClass === 'finance')
      ? `navigateTo('reviewApplication', '${r.id}')`
      : `navigateTo('viewApplication', '${r.id}')`;
    const amountStr = r.amount ? '$' + (typeof r.amount === 'number' ? r.amount.toLocaleString() : r.amount.replace('$','')) : '-';

    return `
      <div class="record-card" onclick="${clickTarget}">
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-primary-600">${r.id.slice(-7)}</span>
            <span class="px-1.5 py-0.5 bg-${r.regionClass}-100 text-${r.regionClass}-700 rounded text-[10px]">${r.region}</span>
          </div>
          <span class="status-badge status-${r.statusClass}">${r.status}</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-800">
            <span class="font-medium">${r.dest}</span>
            <span class="text-gray-400 text-xs ml-2">${r.date || r.startDate}</span>
          </div>
          <span class="text-sm font-bold text-gray-700">${amountStr}</span>
        </div>
        ${r.name && role !== 'employee' ? `<p class="text-xs text-gray-400 mt-1">${r.name} - ${r.dept || ''}</p>` : ''}
      </div>
    `;
  }).join('');
}

function renderMyAppsCards() {
  const myName = roleConfig[currentRole]?.name;
  const records = allRecords.filter(r => r.name === myName);
  renderRecordCards('myAppCards', records, currentRole);
}

function renderPendingCards() {
  renderRecordCards('pendingCards', pendingReviews, currentRole);
}

function renderAllRecordCards() {
  renderRecordCards('allRecordCards', allRecords, 'admin');
}

function filterByStatus(type) {
  if (currentRole === 'employee' || currentRole === 'manager') {
    navigateTo('myApplications');
  } else {
    navigateTo('allRecords');
  }
}

function filterMyApps(btn, filter) {
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.remove('bg-primary-600', 'text-white');
    t.classList.add('bg-gray-100', 'text-gray-500');
  });
  btn.classList.remove('bg-gray-100', 'text-gray-500');
  btn.classList.add('bg-primary-600', 'text-white');

  const myName = roleConfig[currentRole]?.name;
  let records = allRecords.filter(r => r.name === myName);

  if (filter === 'pending') records = records.filter(r => r.statusClass === 'pending' || r.statusClass === 'finance');
  else if (filter === 'expense') records = records.filter(r => r.statusClass === 'expense');
  else if (filter === 'closed') records = records.filter(r => r.statusClass === 'closed' || r.statusClass === 'approved');

  renderRecordCards('myAppCards', records, currentRole);
}

// --- Date Calculation ---
function calcDays() {
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  if (start && end) {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1; // 包含首尾日
    document.getElementById('totalDays').value = diff > 0 ? diff + ' 天' : '日期有誤';
  }
}

// --- Expense Section ---
function toggleExpenseSection(show) {
  const section = document.getElementById('expenseSection');
  if (show) section.classList.remove('hidden');
  else section.classList.add('hidden');
}

function addExpenseCard() {
  const container = document.getElementById('expenseItems');
  const card = document.createElement('div');
  card.className = 'expense-card border border-gray-200 rounded-lg p-3 space-y-2';
  card.innerHTML = `
    <div class="flex items-center justify-between">
      <select class="px-2 py-1.5 border border-gray-200 rounded text-sm flex-1 mr-2">
        <option value="">費用類別</option><option>膳雜費</option><option>住宿費</option><option>交通費</option><option>其他</option>
      </select>
      <select class="px-2 py-1.5 border border-gray-200 rounded text-sm w-20">
        <option>TWD</option><option>USD</option><option>JPY</option><option>CNY</option><option>EUR</option>
      </select>
      <button onclick="removeExpenseCard(this)" class="text-red-400 hover:text-red-600 ml-2 flex-shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div><label class="text-[10px] text-gray-400">單價</label><input type="number" placeholder="0" class="expense-price w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right" oninput="calcExpenseCard(this)" /></div>
      <div><label class="text-[10px] text-gray-400">數量</label><input type="number" placeholder="0" class="expense-qty w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right" oninput="calcExpenseCard(this)" /></div>
      <div><label class="text-[10px] text-gray-400">小計</label><input type="text" readonly class="expense-subtotal w-full px-2 py-1.5 bg-gray-100 border border-gray-200 rounded text-sm text-right" value="$0" /></div>
    </div>
  `;
  container.appendChild(card);
}

function removeExpenseCard(btn) {
  const card = btn.closest('.expense-card');
  const container = card.parentElement;
  if (container.children.length > 1) card.remove();
  calcTotalExpense();
}

function calcExpenseCard(input) {
  const card = input.closest('.expense-card');
  const price = parseFloat(card.querySelector('.expense-price').value) || 0;
  const qty = parseFloat(card.querySelector('.expense-qty').value) || 0;
  card.querySelector('.expense-subtotal').value = '$' + (price * qty).toLocaleString();
  calcTotalExpense();
}

function calcTotalExpense() {
  let total = 0;
  document.querySelectorAll('#expenseItems .expense-card').forEach(card => {
    const price = parseFloat(card.querySelector('.expense-price')?.value) || 0;
    const qty = parseFloat(card.querySelector('.expense-qty')?.value) || 0;
    total += price * qty;
  });
  document.getElementById('totalExpense').textContent = '$' + total.toLocaleString();
}

// --- Submit Application ---
function submitApplication() {
  document.getElementById('confirmModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('confirmModal').classList.add('hidden');
}

function confirmSubmit() {
  closeModal();
  showToast('出差申請已提交，通知已發送給主管', 'success');
  setTimeout(() => navigateTo('myApplications'), 1500);
}

// --- Toast ---
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const content = document.getElementById('toastContent');
  const messageEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');

  messageEl.textContent = message;
  content.className = 'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium';

  const icons = {
    success: '<svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    warning: '<svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>',
    info: '<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    error: '<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  };
  const styles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  iconEl.innerHTML = icons[type] || icons.info;
  content.classList.add(...(styles[type] || styles.info).split(' '));

  toast.classList.remove('hidden', 'translate-x-full');
  toast.classList.add('show', 'translate-x-0');

  setTimeout(() => {
    toast.classList.remove('show', 'translate-x-0');
    toast.classList.add('translate-x-full');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 3000);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const dateStr = now.getFullYear() + '/' +
    String(now.getMonth() + 1).padStart(2, '0') + '/' +
    String(now.getDate()).padStart(2, '0');
  const dateEl = document.getElementById('currentDate');
  if (dateEl) dateEl.textContent = dateStr;
});
