// ============================================================
// Leap 出差及報支系統 - UI Prototype JavaScript
// ============================================================

let currentRole = '';
let currentPage = 'dashboard';

// --- Role Selection ---
function selectRole(role) {
  currentRole = role;
  document.getElementById('roleModal').classList.add('hidden');
  document.getElementById('appShell').classList.remove('hidden');

  const roleConfig = {
    employee: { name: '王小明', title: '資訊部 / 工程師', avatar: '王' },
    manager:  { name: '張部長', title: '資訊部 / 部長',   avatar: '張' },
    finance:  { name: '林會計', title: '財務部 / 會計',   avatar: '林' },
  };

  const info = roleConfig[role];
  document.getElementById('userName').textContent = info.name;
  document.getElementById('userRole').textContent = info.title;
  document.getElementById('userAvatar').textContent = info.avatar;

  // Show/hide nav items based on role
  document.querySelectorAll('[data-role="employee"]').forEach(el => {
    el.style.display = role === 'employee' ? '' : 'none';
  });
  document.querySelectorAll('[data-role="approver"]').forEach(el => {
    el.style.display = (role === 'manager' || role === 'finance') ? '' : 'none';
  });
  document.querySelectorAll('[data-role="admin"]').forEach(el => {
    el.style.display = role === 'manager' ? '' : 'none';
  });

  navigateTo('dashboard');
}

function logout() {
  document.getElementById('roleModal').classList.remove('hidden');
  document.getElementById('appShell').classList.add('hidden');
  currentRole = '';
}

// --- Navigation ---
const pageTitles = {
  dashboard: '儀表板',
  newApplication: '新增出差申請',
  myApplications: '我的申請',
  pendingApprovals: '待審核',
  allRecords: '全部紀錄',
  viewApplication: '申請單詳情',
  reviewApplication: '審核申請單',
  hrManagement: 'HR 人員管理',
};

function navigateTo(page, id) {
  currentPage = page;

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.add('hidden');
  });

  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.remove('hidden');
    // Re-trigger animation
    target.style.animation = 'none';
    target.offsetHeight; // trigger reflow
    target.style.animation = '';
  }

  // Update page title
  document.getElementById('pageTitle').textContent = pageTitles[page] || page;

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.nav === page) {
      btn.classList.add('active');
    }
  });

  // Scroll to top
  document.querySelector('main').scrollTop = 0;
}

// --- Date Calculation ---
function calcDays() {
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  if (start && end) {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    document.getElementById('totalDays').value = diff > 0 ? diff + ' 天' : '日期有誤';
  }
}

// --- Dynamic Table: Companions ---
function addCompanionRow() {
  const tbody = document.getElementById('companionsTable');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="px-4 py-2"><input type="text" placeholder="A00001" class="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-primary-200" /></td>
    <td class="px-4 py-2"><input type="text" placeholder="姓名" class="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-primary-200" /></td>
    <td class="px-4 py-2"><input type="text" placeholder="部門" class="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:ring-1 focus:ring-primary-200" /></td>
    <td class="px-4 py-2 text-center"><button onclick="removeRow(this)" class="text-red-400 hover:text-red-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></td>
  `;
  tbody.appendChild(row);
}

function removeRow(btn) {
  const row = btn.closest('tr');
  const tbody = row.parentElement;
  if (tbody.children.length > 1) {
    row.remove();
  }
  calcTotalExpense();
}

// --- Expense Section ---
function toggleExpenseSection(show) {
  const section = document.getElementById('expenseSection');
  if (show) {
    section.classList.remove('hidden');
  } else {
    section.classList.add('hidden');
  }
}

function addExpenseRow() {
  const tbody = document.getElementById('expenseTable');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="px-3 py-2">
      <select class="w-full px-2 py-1 border border-gray-200 rounded text-sm">
        <option value="">選擇</option>
        <option>膳雜費</option>
        <option>住宿費</option>
        <option>交通費</option>
        <option>其他</option>
      </select>
    </td>
    <td class="px-3 py-2">
      <select class="w-full px-2 py-1 border border-gray-200 rounded text-sm">
        <option>TWD</option>
        <option>USD</option>
        <option>JPY</option>
        <option>CNY</option>
        <option>EUR</option>
      </select>
    </td>
    <td class="px-3 py-2"><input type="number" placeholder="0" class="expense-price w-full px-2 py-1 border border-gray-200 rounded text-sm text-right" oninput="calcExpenseRow(this)" /></td>
    <td class="px-3 py-2"><input type="number" placeholder="0" class="expense-qty w-full px-2 py-1 border border-gray-200 rounded text-sm text-right" oninput="calcExpenseRow(this)" /></td>
    <td class="px-3 py-2"><input type="text" readonly class="expense-subtotal w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded text-sm text-right" value="$0" /></td>
    <td class="px-3 py-2 text-center"><button onclick="removeRow(this)" class="text-red-400 hover:text-red-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></td>
  `;
  tbody.appendChild(row);
}

function calcExpenseRow(input) {
  const row = input.closest('tr');
  const price = parseFloat(row.querySelector('.expense-price').value) || 0;
  const qty = parseFloat(row.querySelector('.expense-qty').value) || 0;
  const subtotal = price * qty;
  row.querySelector('.expense-subtotal').value = '$' + subtotal.toLocaleString();
  calcTotalExpense();
}

function calcTotalExpense() {
  let total = 0;
  document.querySelectorAll('#expenseTable tr').forEach(row => {
    const price = parseFloat(row.querySelector('.expense-price')?.value) || 0;
    const qty = parseFloat(row.querySelector('.expense-qty')?.value) || 0;
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
  setTimeout(() => {
    navigateTo('myApplications');
  }, 1500);
}

// --- Toast Notification ---
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const content = document.getElementById('toastContent');
  const messageEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');

  messageEl.textContent = message;

  // Reset classes
  content.className = 'flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border text-sm font-medium';

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
  // Set current date
  const now = new Date();
  const dateStr = now.getFullYear() + '/' +
    String(now.getMonth() + 1).padStart(2, '0') + '/' +
    String(now.getDate()).padStart(2, '0');
  document.getElementById('currentDate').textContent = dateStr;
});
