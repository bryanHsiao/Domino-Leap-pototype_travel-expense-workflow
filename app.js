// ============================================================
// Leap 出差及報支系統 - Mobile-First UI Prototype
// ============================================================

let currentRole = '';
let currentPage = 'dashboard';

// --- Demo Data ---
const allRecords = [
  { id: 'BTO20260301-001', name: '王小明', dept: '資訊部', empId: 'A00012', title: '工程師', region: '國內', regionClass: 'blue', dest: '台中', startDate: '2026/03/10', endDate: '2026/03/12', days: 3, status: '主管審核中', statusClass: 'pending', amount: 3500, reason: '客戶需求訪談', contact: 'ABC 科技 - 王經理', transport: '大眾運輸', agent: '李小華', description: '前往台中拜訪 ABC 科技，進行新專案需求訪談及技術討論。', applyDate: '2026/03/01' },
  { id: 'BTO20260228-012', name: '李小華', dept: '業務部', empId: 'B00045', title: '業務專員', region: '國外', regionClass: 'purple', dest: '東京', startDate: '2026/03/15', endDate: '2026/03/19', days: 5, status: '出差中/待報支', statusClass: 'expense', amount: 45200, reason: '海外客戶拜訪', contact: 'XYZ Corp - 田中部長', transport: '飛機', agent: '張大方', description: '前往東京拜訪 XYZ Corp，洽談年度合約續約事宜。', applyDate: '2026/02/28' },
  { id: 'BTO20260225-008', name: '張大方', dept: '業務部', empId: 'B00032', title: '資深業務', region: '國內', regionClass: 'blue', dest: '高雄', startDate: '2026/03/01', endDate: '2026/03/03', days: 3, status: '已結案', statusClass: 'closed', amount: 12800, reason: '南區客戶拜訪', contact: 'DEF 企業 - 陳總', transport: '高鐵', agent: '李小華', description: '高雄南區客戶年度拜訪與合約檢討。', applyDate: '2026/02/25' },
  { id: 'BTO20260220-005', name: '陳美玲', dept: '業務部', empId: 'B00018', title: '業務經理', region: '國外', regionClass: 'purple', dest: '上海', startDate: '2026/02/25', endDate: '2026/02/28', days: 4, status: '財務審核中', statusClass: 'finance', amount: 38000, reason: '中國市場調研', contact: '上海分公司 - 劉經理', transport: '飛機', agent: '張大方', description: '前往上海進行市場調研及分公司業務協調。', applyDate: '2026/02/20' },
  { id: 'BTO20260305-002', name: '林志偉', dept: '研發部', empId: 'C00021', title: '研發工程師', region: '國內', regionClass: 'blue', dest: '新竹', startDate: '2026/03/08', endDate: '2026/03/08', days: 1, status: '主管審核中', statusClass: 'pending', amount: 0, reason: '技術交流', contact: '竹科園區 - GHI 科技', transport: '自駕', agent: '黃志明', description: '前往新竹科學園區與 GHI 科技進行技術交流。', applyDate: '2026/03/05' },
  { id: 'BTO20260225-003', name: '王小明', dept: '資訊部', empId: 'A00012', title: '工程師', region: '國外', regionClass: 'purple', dest: '東京', startDate: '2026/03/05', endDate: '2026/03/08', days: 4, status: '出差中/待報支', statusClass: 'expense', amount: 0, reason: '技術研討會', contact: 'AWS Summit Tokyo', transport: '飛機', agent: '李小華', description: '參加 AWS Summit Tokyo 2026 技術研討會。', applyDate: '2026/02/25' },
  { id: 'BTO20260210-007', name: '王小明', dept: '資訊部', empId: 'A00012', title: '工程師', region: '國內', regionClass: 'blue', dest: '新竹', startDate: '2026/02/15', endDate: '2026/02/15', days: 1, status: '已結案', statusClass: 'closed', amount: 1200, reason: '供應商會議', contact: 'JKL 系統 - 周經理', transport: '大眾運輸', agent: '李小華', description: '前往新竹與 JKL 系統討論系統整合方案。', applyDate: '2026/02/10' },
  { id: 'BTO20260130-002', name: '王小明', dept: '資訊部', empId: 'A00012', title: '工程師', region: '國內', regionClass: 'blue', dest: '高雄', startDate: '2026/02/03', endDate: '2026/02/05', days: 3, status: '已結案', statusClass: 'closed', amount: 8500, reason: '系統部署', contact: '高雄分公司 - IT 部門', transport: '高鐵', agent: '李小華', description: '前往高雄分公司進行新系統部署及教育訓練。', applyDate: '2026/01/30' },
  { id: 'BTO20260115-009', name: '王小明', dept: '資訊部', empId: 'A00012', title: '工程師', region: '國內', regionClass: 'blue', dest: '台南', startDate: '2026/01/20', endDate: '2026/01/21', days: 2, status: '已作廢', statusClass: 'voided', amount: 0, reason: '客戶拜訪', contact: 'MNO 科技 - 吳總', transport: '高鐵', agent: '李小華', description: '原訂前往台南拜訪 MNO 科技，因客戶臨時取消會議故作廢。', applyDate: '2026/01/15' },
  { id: 'BTO20260306-004', name: '王小明', dept: '資訊部', empId: 'A00012', title: '工程師', region: '國內', regionClass: 'blue', dest: '桃園', startDate: '2026/03/20', endDate: '2026/03/20', days: 1, status: '草稿', statusClass: 'draft', amount: 0, reason: '工廠參訪', contact: 'PQR 製造 - 林廠長', transport: '自駕', agent: '李小華', description: '前往桃園 PQR 製造工廠進行產線系統需求評估。', applyDate: '2026/03/06' },
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

function quickNewApplication() {
  selectRole('employee');
  navigateTo('newApplication');
}

function logout() {
  document.getElementById('roleModal').classList.remove('hidden');
  document.getElementById('appShell').classList.add('hidden');
  currentRole = '';
}

// --- Field Hint (show on focus, hide on blur) ---
function showFieldHint(id) {
  const dot = document.getElementById(id);
  if (!dot) return;

  const fieldContainer = dot.closest('div');
  const input = fieldContainer?.querySelector('select, input, textarea');

  // Auto-scroll to ensure space below for dropdowns
  if (input) {
    const rect = input.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const needed = input.tagName === 'SELECT' ? 300 : 220;
    const spaceBelow = viewportH - rect.bottom;
    if (spaceBelow < needed) {
      const scrollContainer = document.querySelector('main');
      if (scrollContainer) {
        scrollContainer.scrollBy({ top: needed - spaceBelow, behavior: 'smooth' });
      }
    }
  }

  // Mobile: inline hint above the input (no floating overlay)
  if (window.innerWidth < 768) {
    const tooltip = dot.querySelector('.hint-tooltip');
    if (input && tooltip && !fieldContainer.querySelector('.inline-hint')) {
      const hint = document.createElement('div');
      hint.className = 'inline-hint';
      hint.textContent = tooltip.textContent;
      fieldContainer.insertBefore(hint, input);
    }
    return;
  }

  // Desktop: floating tooltip
  dot.classList.add('hint-active');
}
function hideFieldHint(id) {
  const dot = document.getElementById(id);
  if (dot) dot.classList.remove('hint-active');

  // Mobile: remove inline hint
  if (window.innerWidth < 768) {
    const fieldContainer = dot?.closest('div');
    const hint = fieldContainer?.querySelector('.inline-hint');
    if (hint) hint.remove();
  }
}

// Show/hide hint dot near a form element (for expense cards without IDs)
function showNearHint(el) {
  const dot = el.closest('div')?.querySelector('.hint-dot');
  if (!dot) return;
  // Auto-scroll to make space below for dropdown + tooltip
  const rect = el.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const spaceBelow = viewportH - rect.bottom;
  if (spaceBelow < 220) {
    const scrollContainer = document.querySelector('main');
    if (scrollContainer) {
      scrollContainer.scrollBy({ top: 220 - spaceBelow, behavior: 'smooth' });
    }
  }
  dot.classList.add('hint-active');
}
function hideNearHint(el) {
  const dot = el.closest('div')?.querySelector('.hint-dot');
  if (dot) dot.classList.remove('hint-active');
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

  const title = pageTitles[page] || page;
  document.getElementById('pageTitle').textContent = title;
  const mobileTitleEl = document.getElementById('pageTitleMobile');
  if (mobileTitleEl) mobileTitleEl.textContent = title;

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

  // Render dynamic detail page
  if (page === 'viewApplication' && id) {
    renderViewApplication(id);
  }

  document.querySelector('main').scrollTop = 0;
}

// --- View Application Detail ---
function renderViewApplication(id) {
  const r = allRecords.find(rec => rec.id === id);
  if (!r) return;

  const container = document.getElementById('viewAppContent');
  const amountStr = r.amount ? '$' + r.amount.toLocaleString() : '-';
  const isExpense = r.statusClass === 'expense';
  const isClosed = r.statusClass === 'closed';

  // Build workflow timeline based on status
  let timeline = '';
  const checkIcon = '<svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
  const clockIcon = '<svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

  const doneStep = (label, detail) => `
    <div class="flex gap-3">
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">${checkIcon}</div>
        <div class="w-0.5 h-full bg-gray-200 mt-1"></div>
      </div>
      <div class="pb-4"><p class="text-sm font-medium text-gray-800">${label}</p><p class="text-xs text-gray-500 mt-0.5">${detail}</p></div>
    </div>`;
  const waitStep = (label, detail) => `
    <div class="flex gap-3">
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center animate-pulse">${clockIcon}</div>
      </div>
      <div><p class="text-sm font-medium text-amber-600">${label}</p><p class="text-xs text-gray-500 mt-0.5">${detail}</p></div>
    </div>`;

  if (r.statusClass === 'voided') {
    timeline += doneStep('申請提交', `${r.name} - ${r.applyDate}`);
    timeline += `<div class="flex gap-3">
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></div>
      </div>
      <div><p class="text-sm font-medium text-gray-500">已作廢</p><p class="text-xs text-gray-400 mt-0.5">申請人主動作廢</p></div>
    </div>`;
  } else if (r.statusClass === 'draft') {
    timeline += `<div class="flex gap-3">
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></div>
      </div>
      <div><p class="text-sm font-medium text-gray-500">草稿</p><p class="text-xs text-gray-400 mt-0.5">尚未送出</p></div>
    </div>`;
  } else {
    timeline += doneStep('申請提交', `${r.name} - ${r.applyDate}`);
    if (r.statusClass === 'pending') {
      timeline += waitStep('等待主管審核', '審核人：張部長');
    } else {
      timeline += doneStep('主管已核准', '張部長 - ' + r.applyDate);
      if (r.statusClass === 'expense') {
        timeline += waitStep('出差中 / 待報支', `${r.startDate} ~ ${r.endDate}`);
      } else if (r.statusClass === 'finance') {
        timeline += doneStep('已報支', r.name);
        timeline += waitStep('等待財務審核', '審核人：林會計');
      } else if (r.statusClass === 'closed') {
        timeline += doneStep('費用已報支', r.name);
        timeline += doneStep('財務已核准', '林會計');
        timeline += doneStep('已結案', '結案完成');
      }
    }
  }

  // Expense report section for "出差中/待報支" status
  const expenseSection = isExpense ? `
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-6">
      <div class="flex items-center gap-2 mb-4">
        <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        <h3 class="font-bold text-amber-800">費用報支</h3>
        <span class="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full ml-auto">可隨時填寫</span>
      </div>
      <div id="viewExpenseCards" class="space-y-3">
        <div class="bg-white rounded-lg p-3 border border-amber-100">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-gray-500">費用類別</label>
              <select class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm">
                <option>交通費</option><option>住宿費</option><option>膳雜費</option><option>其他</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] text-gray-500">金額</label>
              <input type="number" placeholder="0" class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>
          <div class="mt-2">
            <label class="text-[10px] text-gray-500">說明</label>
            <input type="text" placeholder="費用說明" class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </div>
      <button onclick="addViewExpenseCard()" class="w-full mt-3 py-2 border-2 border-dashed border-amber-300 rounded-lg text-amber-600 text-sm hover:bg-amber-100 transition-colors">+ 新增費用項目</button>
      <button onclick="showToast('費用報支已暫存')" class="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">暫存報支資料</button>
      <button onclick="showToast('報支已送出，等待財務審核')" class="w-full mt-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">送出報支</button>
    </div>` : '';

  container.innerHTML = `
    <button onclick="navigateTo(currentRole === 'employee' ? 'myApplications' : 'allRecords')" class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      返回
    </button>
    ${isExpense ? expenseSection : ''}
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6">
      <div class="flex items-center gap-3 mb-4">
        <h3 class="font-bold text-gray-800">${r.id}</h3>
        <span class="status-badge status-${r.statusClass}">${r.status}</span>
      </div>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div><span class="text-gray-400">申請者</span><p class="text-gray-800 font-medium">${r.name}（${r.empId}）</p></div>
        <div><span class="text-gray-400">部門 / 職級</span><p class="text-gray-800">${r.dept} / ${r.title}</p></div>
        <div><span class="text-gray-400">申請日期</span><p class="text-gray-800">${r.applyDate}</p></div>
        <div><span class="text-gray-400">出差區域</span><p><span class="px-2 py-0.5 bg-${r.regionClass}-100 text-${r.regionClass}-700 rounded text-xs">${r.region}</span></p></div>
        <div><span class="text-gray-400">出發日期</span><p class="text-gray-800">${r.startDate}</p></div>
        <div><span class="text-gray-400">結束日期</span><p class="text-gray-800">${r.endDate}</p></div>
        <div><span class="text-gray-400">總計天數</span><p class="text-gray-800">${r.days} 天</p></div>
        <div><span class="text-gray-400">出差地點</span><p class="text-gray-800">${r.dest}</p></div>
        <div><span class="text-gray-400">出差原因</span><p class="text-gray-800">${r.reason}</p></div>
        <div><span class="text-gray-400">拜訪對象</span><p class="text-gray-800">${r.contact}</p></div>
        <div><span class="text-gray-400">交通工具</span><p class="text-gray-800">${r.transport}</p></div>
        <div><span class="text-gray-400">代理人</span><p class="text-gray-800">${r.agent}</p></div>
      </div>
      <div class="mt-3 pt-3 border-t border-gray-100 text-sm">
        <span class="text-gray-400">出差說明</span>
        <p class="text-gray-800 mt-1">${r.description}</p>
      </div>
      ${r.amount ? `<div class="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
        <div><span class="text-gray-400">是否報支</span><p class="text-gray-800">是</p></div>
        <div><span class="text-gray-400">預估金額</span><p class="text-gray-800 font-bold">${amountStr}</p></div>
      </div>` : ''}
    </div>
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 md:p-6">
      <h3 class="font-semibold text-gray-800 text-sm mb-4">審核歷程</h3>
      <div class="space-y-4">${timeline}</div>
    </div>`;
}

function addViewExpenseCard() {
  const container = document.getElementById('viewExpenseCards');
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg p-3 border border-amber-100';
  card.innerHTML = `
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-[10px] text-gray-500">費用類別</label>
        <select class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm">
          <option>交通費</option><option>住宿費</option><option>膳雜費</option><option>其他</option>
        </select>
      </div>
      <div>
        <label class="text-[10px] text-gray-500">金額</label>
        <input type="number" placeholder="0" class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm" />
      </div>
    </div>
    <div class="mt-2">
      <label class="text-[10px] text-gray-500">說明</label>
      <input type="text" placeholder="費用說明" class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm" />
    </div>`;
  container.appendChild(card);
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

  // Show expense alert for employee with pending expense records
  const expenseAlert = document.getElementById('expenseAlert');
  if (expenseAlert) {
    const myExpenseRecords = allRecords.filter(r => r.name === myName && r.statusClass === 'expense');
    if (role === 'employee' && myExpenseRecords.length > 0) {
      expenseAlert.style.display = 'block';
      expenseAlert.innerHTML = myExpenseRecords.map(r => `
        <div onclick="navigateTo('viewApplication','${r.id}')" class="flex items-center justify-between cursor-pointer hover:bg-amber-100 rounded-lg p-2 -mx-2 transition-colors">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            <div>
              <p class="text-sm font-medium text-amber-800">${r.dest} 出差待報支</p>
              <p class="text-xs text-amber-600">${r.startDate} ~ ${r.endDate}</p>
            </div>
          </div>
          <span class="text-xs bg-amber-600 text-white px-2.5 py-1 rounded-full font-medium">立即報支</span>
        </div>`).join('');
    } else {
      expenseAlert.style.display = 'none';
    }
  }

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

// --- Mini Timeline for Desktop Cards ---
function buildMiniTimeline(r) {
  // steps: 0=申請, 1=主管審核, 2=費用報支, 3=結案
  // status: 'done', 'active', 'pending'
  const steps = [
    { label: '申請', status: 'done' },
    { label: '主管審核', status: 'pending' },
    { label: '費用報支', status: 'pending' },
    { label: '結案', status: 'pending' },
  ];

  if (r.statusClass === 'draft') {
    steps[0].status = 'draft';
  } else if (r.statusClass === 'voided') {
    steps[0].status = 'voided';
    steps[1].status = 'voided';
    steps[2].status = 'voided';
    steps[3].status = 'voided';
  } else if (r.statusClass === 'pending') {
    steps[1].status = 'active';
  } else if (r.statusClass === 'expense') {
    steps[1].status = 'done';
    steps[2].status = 'active';
  } else if (r.statusClass === 'finance') {
    steps[1].status = 'done';
    steps[2].status = 'done';
    steps[3].status = 'active';
  } else if (r.statusClass === 'closed' || r.statusClass === 'approved') {
    steps[1].status = 'done';
    steps[2].status = 'done';
    steps[3].status = 'done';
  }

  const stepHtml = steps.map((s, i) => {
    const dot = s.status === 'done'
      ? '<div class="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>'
      : s.status === 'active'
        ? '<div class="w-5 h-5 bg-amber-400 rounded-full animate-pulse"></div>'
        : s.status === 'voided'
          ? '<div class="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg></div>'
          : s.status === 'draft'
            ? '<div class="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></div>'
            : '<div class="w-5 h-5 bg-gray-200 rounded-full"></div>';
    const textColor = s.status === 'done' ? 'text-emerald-600' : s.status === 'active' ? 'text-amber-600 font-medium' : s.status === 'voided' ? 'text-red-400' : s.status === 'draft' ? 'text-gray-400' : 'text-gray-300';
    const line = i < steps.length - 1
      ? `<div class="h-0.5 w-8 ${s.status === 'done' ? 'bg-emerald-400' : 'bg-gray-200'}" style="margin-top:10px;flex-shrink:0"></div>`
      : '';
    return `<div class="flex flex-col items-center" style="min-width:48px">
      ${dot}<span class="text-[10px] ${textColor} mt-0.5">${s.label}</span>
    </div>${line}`;
  }).join('');

  return `<div class="flex items-start">${stepHtml}</div>`;
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
    const clickTarget = r.statusClass === 'draft'
      ? `editDraft('${r.id}')`
      : (role === 'manager' || role === 'finance') && (r.statusClass === 'pending' || r.statusClass === 'finance')
        ? `navigateTo('reviewApplication', '${r.id}')`
        : `navigateTo('viewApplication', '${r.id}')`;
    const amountStr = r.amount ? '$' + (typeof r.amount === 'number' ? r.amount.toLocaleString() : r.amount.replace('$','')) : '-';

    return `
      <div class="record-card" onclick="${clickTarget}">
        <div class="md:hidden">
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
        <div class="hidden md:flex md:items-center md:justify-between md:gap-4">
          <div class="flex-shrink-0" style="width:180px">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-semibold text-primary-600">${r.id.slice(-7)}</span>
              <span class="px-1.5 py-0.5 bg-${r.regionClass}-100 text-${r.regionClass}-700 rounded text-[10px]">${r.region}</span>
            </div>
            <div class="text-sm text-gray-800">
              <span class="font-medium">${r.dest}</span>
              <span class="text-gray-400 text-xs ml-1">${r.date || r.startDate}</span>
            </div>
            ${r.name && role !== 'employee' ? `<p class="text-xs text-gray-400 mt-0.5">${r.name} - ${r.dept || ''}</p>` : ''}
          </div>
          <div class="flex-shrink-0">${buildMiniTimeline(r)}</div>
          <div class="flex-shrink-0 text-right" style="width:100px">
            <span class="status-badge status-${r.statusClass}">${r.status}</span>
            <p class="text-sm font-bold text-gray-700 mt-1">${amountStr}</p>
          </div>
        </div>
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

  if (filter === 'draft') records = records.filter(r => r.statusClass === 'draft');
  else if (filter === 'pending') records = records.filter(r => r.statusClass === 'pending' || r.statusClass === 'finance');
  else if (filter === 'expense') records = records.filter(r => r.statusClass === 'expense');
  else if (filter === 'closed') records = records.filter(r => r.statusClass === 'closed' || r.statusClass === 'approved' || r.statusClass === 'voided');

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
  showFieldHint('hintExpense');
  setTimeout(() => hideFieldHint('hintExpense'), 5000);
  if (show) {
    section.classList.remove('hidden');
  } else {
    section.classList.add('hidden');
  }
}

function addExpenseCard() {
  const container = document.getElementById('expenseItems');
  const card = document.createElement('div');
  card.className = 'expense-card border border-gray-200 rounded-lg p-3 space-y-2';
  card.innerHTML = `
    <div class="flex items-start gap-2">
      <div class="flex-1">
        <label class="text-[10px] text-gray-400 flex items-center gap-1">費用類別 <span class="hint-dot hint-field" style="position:relative;top:0;right:0;flex-shrink:0;">i<span class="hint-tooltip">費用類別可依企業需求自定義，支援多幣別匯率換算及 ERP 拋轉。</span></span></label>
        <select class="w-full px-2 py-1.5 border border-gray-200 rounded text-sm" onfocus="showNearHint(this)" onblur="hideNearHint(this)">
          <option value="">請選擇</option><option>膳雜費</option><option>住宿費</option><option>交通費</option><option>其他</option>
        </select>
      </div>
      <div class="w-24">
        <label class="text-[10px] text-gray-400 flex items-center gap-1">幣別 <span class="hint-dot hint-field" style="position:relative;top:0;right:0;flex-shrink:0;">i<span class="hint-tooltip">幣別清單可由後端資料庫動態提供，無須寫死於前端，支援即時匯率換算。</span></span></label>
        <select class="w-full px-2 py-1.5 border border-gray-200 rounded text-sm" onfocus="showNearHint(this)" onblur="hideNearHint(this)">
          <option>TWD</option><option>USD</option><option>JPY</option><option>CNY</option><option>EUR</option>
        </select>
      </div>
      <button onclick="removeExpenseCard(this)" class="text-red-400 hover:text-red-600 mt-4 flex-shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div><label class="text-[10px] text-gray-400">單價</label><input type="number" placeholder="0" class="expense-price w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right" oninput="calcExpenseCard(this)" /></div>
      <div><label class="text-[10px] text-gray-400">數量</label><input type="number" placeholder="0" class="expense-qty w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right" oninput="calcExpenseCard(this)" /></div>
      <div><label class="text-[10px] text-gray-400">小計</label><input type="text" readonly class="expense-subtotal w-full px-2 py-1.5 bg-gray-100 border border-gray-200 rounded text-sm text-right" value="$0" /></div>
    </div>
    <div class="expense-receipt border border-dashed border-gray-300 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors">
      <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-gray-500">上傳收據 <span class="text-[10px] text-gray-400">（PDF, JPG, PNG，最大 10MB）</span></p>
      </div>
      <span class="hint-dot hint-below hint-field" style="position:relative;top:0;right:0;">i<span class="hint-tooltip">支援收據 OCR 智慧辨識，上傳後可自動擷取金額、日期、商家等資訊，減少人工輸入。實際導入時可依需求啟用或關閉此功能。</span></span>
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
function editDraft(id) {
  const r = allRecords.find(rec => rec.id === id);
  if (!r) return;
  navigateTo('newApplication');
  // Pre-fill form fields with draft data
  setTimeout(() => {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    if (startDate) startDate.value = r.startDate.replace(/\//g, '-');
    if (endDate) endDate.value = r.endDate.replace(/\//g, '-');
    calcDays();
    const region = document.getElementById('formRegion');
    if (region) region.value = r.region === '國內' ? 'domestic' : 'overseas';
    const dest = document.getElementById('formDest');
    if (dest) dest.value = r.dest || '';
    const reason = document.getElementById('formReason');
    if (reason) reason.value = r.reason || '';
    const contact = document.getElementById('formContact');
    if (contact) contact.value = r.contact || '';
    const transport = document.getElementById('formTransport');
    if (transport) {
      // Match by option text
      const opts = transport.options;
      for (let i = 0; i < opts.length; i++) {
        if (opts[i].text === r.transport) { transport.selectedIndex = i; break; }
      }
    }
    const agent = document.getElementById('formAgent');
    if (agent) agent.value = r.agent || '';
    const desc = document.getElementById('formDescription');
    if (desc) desc.value = r.description || '';
  }, 50);
}

function saveDraft() {
  showToast('草稿已儲存', 'info');
  setTimeout(() => {
    navigateTo('myApplications');
    // Auto-select draft filter
    const draftBtn = document.querySelector('.filter-tab[onclick*="draft"]');
    if (draftBtn) filterMyApps(draftBtn, 'draft');
  }, 1000);
}

function submitApplication() {
  // Validate required fields
  const fields = [
    { id: 'startDate', label: '出發日期' },
    { id: 'endDate', label: '結束日期' },
    { id: 'formRegion', label: '出差區域' },
    { id: 'formDest', label: '出差地點' },
    { id: 'formReason', label: '出差原因' },
    { id: 'formContact', label: '拜訪對象' },
    { id: 'formTransport', label: '往返交通工具' },
  ];

  let missing = [];
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    const val = el.value.trim();
    if (!val) {
      missing.push(f.label);
      el.classList.add('border-red-500');
      el.classList.remove('border-gray-300');
    } else {
      el.classList.remove('border-red-500');
      el.classList.add('border-gray-300');
    }
  });

  // Check radio: 是否報支旅費
  const claimChecked = document.querySelector('input[name="claimExpense"]:checked');
  if (!claimChecked) {
    missing.push('是否報支旅費');
  }

  if (missing.length > 0) {
    showToast('請填寫必填欄位：' + missing.join('、'), 'error');
    // Scroll to first invalid field
    const firstInvalid = document.querySelector('.border-red-500');
    if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

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

// --- Void Application ---
function voidApplication() {
  document.getElementById('voidModal').classList.remove('hidden');
}

function closeVoidModal() {
  document.getElementById('voidModal').classList.add('hidden');
}

function confirmVoid() {
  closeVoidModal();
  showToast('申請單已作廢', 'warning');
  setTimeout(() => navigateTo('myApplications'), 1500);
}

// --- Notification Panel ---
function toggleNotificationPanel() {
  const panel = document.getElementById('notificationPanel');
  panel.classList.toggle('hidden');
  // Close on outside click
  if (!panel.classList.contains('hidden')) {
    setTimeout(() => {
      document.addEventListener('click', closeNotificationOnOutside);
    }, 100);
  }
}
function closeNotificationOnOutside(e) {
  const panel = document.getElementById('notificationPanel');
  if (panel && !panel.closest('div').contains(e.target)) {
    panel.classList.add('hidden');
    document.removeEventListener('click', closeNotificationOnOutside);
  }
}
function markAllRead() {
  document.querySelectorAll('#notificationPanel .bg-primary-50\\/40').forEach(el => {
    el.classList.remove('bg-primary-50/40');
  });
  document.querySelectorAll('#notificationPanel .bg-primary-500').forEach(dot => {
    dot.remove();
  });
  const badge = document.querySelector('button[onclick="toggleNotificationPanel()"] .bg-red-500');
  if (badge) badge.textContent = '0';
  showToast('已標記全部已讀', 'success');
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
