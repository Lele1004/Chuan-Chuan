/* 資料初始化與設定
   包含預設使用者、書籍假資料與常數設定 */
const defaultUsers = [
    { username: "11344210", password: "123", name: "楊育霖", rating: 5.0, reviews: 120, avatar: "楊", email: "yang@example.com", isNew: false },
    { username: "11344207", password: "123", name: "藍子詒", rating: 4.9, reviews: 85, avatar: "藍", email: "lan@example.com", isNew: false },
    { username: "11344224", password: "123", name: "劉彥辰", rating: 4.8, reviews: 92, avatar: "劉", email: "liu@example.com", isNew: false },
    { username: "11344235", password: "123", name: "夏誥均", rating: 4.7, reviews: 76, avatar: "夏", email: "hsia@example.com", isNew: false }
];

const defaultBooks = [
    { id: 1, title: "計算機概論", price: 500, stock: 5, sellerId: "11344210", tags: ["教科書", "大一必修"], image: "../assets/images/book1.jpg", desc: "九成新，無劃記。" },
    { id: 2, title: "經濟學原理", price: 450, stock: 2, sellerId: "11344207", tags: ["教科書", "商管"], image: "../assets/images/book2.jpg", desc: "有些許螢光筆筆跡。" },
    { id: 3, title: "哈利波特", price: 200, stock: 1, sellerId: "11344224", tags: ["小說", "魔法"], image: "../assets/images/book3.jpg", desc: "書況良好。" },
    { id: 4, title: "灌籃高手 01", price: 150, stock: 10, sellerId: "11344235", tags: ["漫畫", "熱血"], image: "../assets/images/book4.jpg", desc: "值得收藏。" },
    { id: 5, title: "從零開始！Java 程式設計入門", price: 580, stock: 3, sellerId: "11344210", tags: ["教科書", "程式"], image: "../assets/images/book5.jpg", desc: "有筆記，好用。" },
    { id: 6, title: "全新! New TOEIC我的第一本新多益閱讀課本 (2冊合售/附MP3)", price: 695, stock: 2, sellerId: "11344235", tags: ["教科書", "英文","多益考試"], image: "../assets/images/book6.jpg", desc: "幾乎全新，沒動過。" },
    { id: 7, title: "數位邏輯設計 第6版", price: 560, stock: 1, sellerId: "11344207", tags: ["教科書", "程式"], image: "../assets/images/book7.jpg", desc: "有褶皺，介意勿買。" },
    { id: 8, title: "閱讀策略神文本", price: 150, stock: 3, sellerId: "11344224", tags: ["教科書", "國文","大一必修"], image: "../assets/images/book8.jpg", desc: "與他人購入的，有些許使用痕跡。" },
    { id: 9, title: "鬼滅之刃 2", price: 100, stock: 4, sellerId: "11344210", tags: ["漫畫", "熱血"], image: "../assets/images/book9.jpg", desc: "保存完美，有書套。" },
    { id: 10, title: "鏈鋸人 1", price: 100, stock: 6, sellerId: "11344207", tags: ["漫畫", "熱血","怪誕"], image: "../assets/images/book10.jpg", desc: "內頁有折到。" },
    { id: 11, title: "咒術迴戰 4", price: 80, stock: 2, sellerId: "11344224", tags: ["漫畫", "熱血"], image: "../assets/images/book11.jpg", desc: "沾到水，有髒掉。" },
    { id: 12, title: "World English 3", price: 250, stock: 1, sellerId: "11344235", tags: ["教科書", "英文"], image: "../assets/images/book12.jpg", desc: "封面撕到了，我有貼起來。" },
    { id: 13, title: "天氣之子", price: 450, stock: 1, sellerId: "11344207", tags: ["小說", "奇幻"], image: "../assets/images/book13.jpg", desc: "故事情節好看，一生推" },
    { id: 14, title: "挪威的森林", price: 297, stock: 2, sellerId: "11344210", tags: ["小說"], image: "../assets/images/book14.jpg", desc: "一生必看小說" },
    { id: 15, title: "管理數學", price: 297, stock: 3, sellerId: "11344235", tags: ["教科書","數學"], image: "../assets/images/book15.jpg", desc: "老師說一定要買，買吧。" },
    { id: 16, title: "大一普物 課本", price: 1200, stock: 1, sellerId: "11344224", tags: ["教科書","物理"], image: "../assets/images/book16.jpg", desc: "幫同學代售。" }
];

const BASIC_SHIPPING_FEE = 60; 


/* 資料存取層
   負責與 LocalStorage 互動，包含自動修復舊資料邏輯 */
function getBooks() {
    const stored = localStorage.getItem("books");
    if (!stored) return defaultBooks;
    let books = JSON.parse(stored);
    
    //確保舊資料有庫存欄位，並修正圖片路徑
    let needUpdate = false;
    books = books.map(book => {
        if (book.stock === undefined) { book.stock = 5; needUpdate = true; }
        if (book.image && !book.image.includes("../assets/")) {
             if(book.image.startsWith("images/")) { 
                 book.image = "../assets/" + book.image; 
                 needUpdate = true; 
             }
        }
        return book;
    });
    if (needUpdate) localStorage.setItem("books", JSON.stringify(books));
    return books;
}
function saveBooks(books) { localStorage.setItem("books", JSON.stringify(books)); }

function getUsers() {
    const stored = localStorage.getItem("users");
    if (!stored) { localStorage.setItem("users", JSON.stringify(defaultUsers)); return defaultUsers; }
    return JSON.parse(stored);
}
function saveUsers(users) { localStorage.setItem("users", JSON.stringify(users)); }

function getCurrentUser() {
    const user = sessionStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}
function updateSessionUser(updatedUser) {
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
}

function getCart() { return JSON.parse(localStorage.getItem("cart")) || []; }
function saveCart(cart) { localStorage.setItem("cart", JSON.stringify(cart)); }
function getOrders() { return JSON.parse(localStorage.getItem("orders")) || []; }


/* 核心初始化與路由
   偵測當前頁面 ID 並執行對應邏輯 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. 自動注入會員彈窗 HTML
    injectProfileModalHTML();
    
    // 2. 更新導覽列與購物車數量
    updateNav(); 
    updateCartCount();

    // 3. 根據頁面 ID 執行對應邏輯
    const pageId = document.body.id;
    if (pageId === "page-home") initHome();
    if (pageId === "page-shop") initShop();
    if (pageId === "page-product") initProduct();
    if (pageId === "page-cart") initCart();
    if (pageId === "page-login") initLogin();
    if (pageId === "page-register") initRegister();
    if (pageId === "page-publish") initPublish();
    if (pageId === "page-seller") initSeller();
    if (pageId === "page-order-history") initOrderHistory();
});


/* 全域 UI 功能 (Global UI Functions)
   導覽列、搜尋、彈窗注入、登出等功能 */

// 自動注入會員資料彈窗 HTML
function injectProfileModalHTML() {
    if (document.getElementById("profile-modal")) return;
    const modalHTML = `
    <div id="profile-modal" class="modal-overlay">
        <div class="checkout-modal">
            <span class="close-modal" onclick="closeProfileModal()">&times;</span>
            <h2 style="text-align:center; color:var(--forest-bg); margin-bottom:20px;">會員個人資料</h2>
            <form id="profile-form">
                <div class="form-group"><label>姓名</label><input type="text" id="pf-name" required></div>
                <div class="form-group"><label>學號 (帳號)</label><input type="text" id="pf-id" disabled style="background:#eee; cursor:not-allowed;"></div>
                <div class="form-group"><label>電子信箱 Email</label><input type="email" id="pf-email" placeholder="請補填 Email"></div>
                <div class="form-group"><label>密碼 <span class="toggle-pwd" onclick="toggleProfilePwd()">👁️ 顯示/隱藏</span></label><input type="password" id="pf-pwd" required></div>
                <button type="submit" class="btn">儲存修改</button>
            </form>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 綁定儲存事件
    const profileForm = document.getElementById("profile-form");
    if(profileForm) {
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = getCurrentUser();
            const newName = document.getElementById("pf-name").value;
            const newEmail = document.getElementById("pf-email").value;
            const newPwd = document.getElementById("pf-pwd").value;
            let users = getUsers();
            const idx = users.findIndex(u => u.username === user.username);
            if(idx !== -1) {
                users[idx].name = newName; users[idx].email = newEmail; users[idx].password = newPwd;
                saveUsers(users); updateSessionUser(users[idx]);
                alert("個人資料已更新！"); closeProfileModal(); updateNav();
            }
        });
    }
}

// 更新導覽列
function updateNav() {
    const user = getCurrentUser();
    const nav = document.querySelector("nav");
    if (!nav) return;
    let html = `
        <a href="shop.html">瀏覽書籍</a>
        <a href="cart.html">購物車 (<span id="cart-count">0</span>)</a>
    `;
    if (user) {
        const adminBadge = user.username === "11344210" ? "👑" : "";
        html += `
            <div class="dropdown">
                <a href="#" class="dropbtn">${adminBadge} ${user.name} ▾</a>
                <div class="dropdown-content">
                    <a href="#" onclick="openProfileModal()">個人資料</a>
                    <a href="order_history.html">我的訂單</a>
                    <a href="seller.html?user=${user.username}">個人賣場</a>
                    <a href="publish.html">+ 發布書籍</a>
                    <a href="#" onclick="logout()">登出</a>
                </div>
            </div>
        `;
    } else { html += `<a href="login.html">登入/註冊</a>`; }
    nav.innerHTML = html;
    updateCartCount();
}

function logout() { sessionStorage.removeItem("currentUser"); alert("已登出！"); window.location.href = "index.html"; }

function updateCartCount() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const countSpan = document.getElementById("cart-count");
    if (countSpan) countSpan.innerText = totalQty;
}

// 標籤搜尋(支援跨頁跳轉)
window.searchByTag = (tag) => {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.value = "#" + tag;
        searchInput.dispatchEvent(new Event('input'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        sessionStorage.setItem("pendingSearch", "#" + tag);
        window.location.href = "shop.html";
    }
};

// 彈窗操作(全域可用)
window.openProfileModal = () => {
    const user = getCurrentUser();
    if(!user) return;
    document.getElementById("pf-name").value = user.name;
    document.getElementById("pf-id").value = user.username;
    document.getElementById("pf-email").value = user.email || "";
    document.getElementById("pf-pwd").value = user.password;
    const modal = document.getElementById("profile-modal");
    if(modal) modal.style.display = "block";
};
window.closeProfileModal = () => {
    const modal = document.getElementById("profile-modal");
    if(modal) modal.style.display = "none";
};
window.toggleProfilePwd = () => {
    const pwdInput = document.getElementById("pf-pwd");
    pwdInput.type = pwdInput.type === "password" ? "text" : "password";
};


/* 頁面邏輯 (Page Logic)
   依照不同頁面拆分功能 */

// 首頁
function initHome() {
    const track = document.querySelector('.slogan-track');
    const btn = document.querySelector('.minimal-btn');
    if(btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            document.body.classList.add('page-exit');
            setTimeout(() => { window.location.href = 'shop.html'; }, 800);
        });
    }
    if (!track) return;
    let idx = 0;
    setInterval(() => { idx = (idx + 1) % 3; track.style.transform = `translateX(${idx * -100}%)`; }, 3000);
}

// 商店頁
function initShop() {
    let slideIndex = 1;
    let slideTimer;

    // 啟動輪播
    showSlides(slideIndex);

    // 手動切換函式
    window.plusSlides = (n) => {
        clearTimeout(slideTimer);
        showSlides(slideIndex += n);
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("carousel-slide");
        if(slides.length === 0) return;
        
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
        
        slides[slideIndex-1].style.display = "block";  
        slideTimer = setTimeout(() => { plusSlides(1); }, 4000); // 4秒自動換頁
    }

    const container = document.getElementById("product-list");
    const searchInput = document.getElementById("search-input");
    const tagContainer = document.getElementById("tag-cloud");
    const pending = sessionStorage.getItem("pendingSearch");
    if (pending) { searchInput.value = pending; sessionStorage.removeItem("pendingSearch"); }

    const books = getBooks();
    const allTags = {};
    books.forEach(b => b.tags && b.tags.forEach(tag => allTags[tag] = (allTags[tag] || 0) + 1));
    const sortedTags = Object.keys(allTags).sort((a, b) => allTags[b] - allTags[a]).slice(0, 5);
    tagContainer.innerHTML = "熱門搜尋：";
    sortedTags.forEach(tag => {
        tagContainer.innerHTML += `<span class="tag hot" style="cursor:pointer;" onclick="searchByTag('${tag}')">#${tag}</span>`;
    });

    function render(data) {
        container.innerHTML = "";
        if(data.length === 0) { container.innerHTML = "<p style='text-align:center; width:100%;'>找不到書籍。</p>"; return; }
        data.forEach(book => container.innerHTML += createBookCard(book));
    }
    render(books);
    searchInput.addEventListener("input", () => {
        const key = searchInput.value.toLowerCase().trim();
        let filtered = [];
        if (key.startsWith("#")) {
            filtered = books.filter(b => b.tags && b.tags.some(t => t.toLowerCase().includes(key.substring(1))));
        } else {
            filtered = books.filter(b => b.title.toLowerCase().includes(key));
        }
        render(filtered);
    });
    if (searchInput.value) searchInput.dispatchEvent(new Event('input'));
}

// 建立書籍卡片
function createBookCard(book) {
    const user = getCurrentUser();
    const isAdmin = user && user.username === "11344210";
    const isOwner = user && user.username === book.sellerId;
    let deleteBtn = "";
    if (isAdmin || isOwner) {
        deleteBtn = `<button onclick="event.stopPropagation(); deleteBook(${book.id})" 
                     style="position:absolute; top:5px; right:5px; background:var(--danger); color:white; border:none; border-radius:50%; width:25px; height:25px; cursor:pointer; z-index:10;">×</button>`;
    }
    const tagsHtml = book.tags ? book.tags.slice(0, 2).map(t => `<span class="tag" style="cursor:pointer;" onclick="event.stopPropagation(); searchByTag('${t}')">#${t}</span>`).join("") : "";
    const stockMsg = book.stock > 0 ? `庫存: ${book.stock}` : `<span style="color:var(--danger)">已售完</span>`;
    return `
        <div class="product-card" onclick="window.location.href='product.html?id=${book.id}'">
            ${deleteBtn}
            <img src="${book.image}" onerror="this.onerror=null; this.src='../assets/images/book0.jpg';" alt="${book.title}">
            <h3>${book.title}</h3>
            <p class="price">NT$ ${book.price}</p>
            <p class="stock">${stockMsg}</p>
            <div style="padding:0 15px 15px 15px;">${tagsHtml}</div>
        </div>
    `;
}

// 商品詳情頁
function initProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const books = getBooks();
    const book = books.find(b => b.id === id);

    if (book) {
        document.getElementById("detail-img").src = book.image;
        document.getElementById("detail-title").innerText = book.title;
        document.getElementById("detail-price").innerText = "NT$ " + book.price;
        document.getElementById("detail-desc").innerText = book.desc;
        const users = getUsers();
        const seller = users.find(u => u.username === book.sellerId) || { name: "未知" };
        document.getElementById("detail-author").innerHTML = `賣家：<a href="seller.html?user=${book.sellerId}" style="color:var(--accent-gold);">${seller.name}</a>`;
        document.getElementById("detail-tags").innerHTML = book.tags.map(t => `<span class="tag">#${t}</span>`).join(" ");
        const stockEl = document.getElementById("detail-stock");
        const qtyInput = document.getElementById("buy-qty");
        const addBtn = document.getElementById("add-btn");
        stockEl.innerText = `剩餘庫存: ${book.stock}`;
        qtyInput.max = book.stock;
        if (book.stock <= 0) {
            addBtn.innerText = "已售完";
            addBtn.disabled = true;
            qtyInput.disabled = true;
        } else {
            addBtn.onclick = () => {
                const qty = parseInt(qtyInput.value);
                if(qty > 0 && qty <= book.stock) addToCart(book.id, qty);
                else alert("請輸入有效的購買數量！");
            };
        }
    }
    
    // 動態插入評分選單
    const reviewInputDiv = document.querySelector("#review-text").parentNode;
    const ratingSelectHTML = `
        <div style="margin-bottom:10px;">
            <label>評分：</label>
            <select id="review-score" class="rating-select">
                <option value="5">★★★★★ (5星)</option>
                <option value="4">★★★★☆ (4星)</option>
                <option value="3">★★★☆☆ (3星)</option>
                <option value="2">★★☆☆☆ (2星)</option>
                <option value="1">★☆☆☆☆ (1星)</option>
            </select>
        </div>
    `;
    reviewInputDiv.insertAdjacentHTML('afterbegin', ratingSelectHTML);

    window.submitReview = () => {
        const user = getCurrentUser();
        if (!user) { alert("請先登入才能評論！"); return; }
        const text = document.getElementById("review-text").value;
        const score = document.getElementById("review-score").value;
        if (text.trim() === "") { alert("請輸入內容"); return; }
        
        const stars = "★".repeat(score) + "☆".repeat(5 - score);
        const reviewSection = document.querySelector(".review-section");
        const newReview = document.createElement("div");
        newReview.className = "review-item";
        newReview.innerHTML = `
            <span class="review-user">${user.name}</span>
            <span class="review-rating">${stars}</span>
            <p class="review-content">${text}</p>
        `;
        const title = reviewSection.querySelector("h3");
        title.insertAdjacentElement("afterend", newReview);
        document.getElementById("review-text").value = "";
        alert("評論已送出！");
    };
}

// 購物車頁
function initCart() {
    const listContainer = document.getElementById("cart-list");
    const checkoutBtn = document.getElementById("checkout-btn");
    let cart = getCart();
    const books = getBooks(); 
    const user = getCurrentUser();
    let shippingFee = BASIC_SHIPPING_FEE;
    let tempSubtotal = 0;
    cart.forEach(item => {
        const book = books.find(b => b.id === item.id);
        if (book) tempSubtotal += book.price * item.qty;
    });
    let shippingMsg = "運費";
    if (tempSubtotal >= 1000) { shippingFee = 0; shippingMsg = "運費 (滿千免運)"; } 
    else if (user && user.isNew) { shippingFee = 0; shippingMsg = "運費 (新會員首購免運)"; }

    const summaryDiv = document.querySelector("main div[style*='text-align: right']");
    if(summaryDiv) {
        summaryDiv.innerHTML = `
            <p>商品總計：NT$ <span id="cart-subtotal">${tempSubtotal}</span></p>
            <p>${shippingMsg}：NT$ ${shippingFee}</p>
            <hr style="width: 200px; margin-left: auto; border: 0.5px solid #555;">
            <div style="font-size: 1.5rem; margin-top: 10px;">
                應付金額：<strong style="color: var(--accent-gold);">NT$ <span id="cart-total">${tempSubtotal + shippingFee}</span></strong>
            </div>
        `;
    }

    window.updateItemQty = (index, newQty) => {
        newQty = parseInt(newQty);
        if (newQty < 1) newQty = 1;
        const bookId = cart[index].id;
        const book = books.find(b => b.id === bookId);
        if (newQty > book.stock) { alert(`庫存僅剩 ${book.stock} 本`); newQty = book.stock; }
        cart[index].qty = newQty;
        saveCart(cart);
        updateCartCount();
        location.reload();
    };

    function renderCart() {
        listContainer.innerHTML = "";
        if (cart.length === 0) {
            listContainer.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:40px; color:#888;'>購物車是空的</td></tr>";
            checkoutBtn.disabled = true;
            return;
        }
        checkoutBtn.disabled = false;
        cart.forEach((item, index) => {
            const book = books.find(b => b.id === item.id);
            if (book) {
                const itemTotal = book.price * item.qty;
                listContainer.innerHTML += `
                    <tr>
                        <td><a href="product.html?id=${book.id}" class="cart-item-link">${book.title}</a></td>
                        <td><input type="number" class="qty-input" value="${item.qty}" min="1" max="${book.stock}" onchange="updateItemQty(${index}, this.value)"></td>
                        <td>NT$ ${itemTotal}</td>
                        <td><button class="del-btn" onclick="removeCartItem(${index})">刪除</button></td>
                    </tr>
                `;
            }
        });
    }
    renderCart();
    
    window.removeCartItem = (index) => {
        cart.splice(index, 1);
        saveCart(cart);
        updateCartCount();
        renderCart();
    };

    checkoutBtn.addEventListener("click", () => {
        if(!getCurrentUser()) { alert("請先登入才能結帳！"); window.location.href = "login.html"; return; }
        const finalTotal = document.getElementById("cart-total").innerText;
        document.getElementById("modal-total").innerText = finalTotal;
        document.getElementById("checkout-modal").style.display = "block";
        document.getElementById("r-email").value = getCurrentUser().email || "";
    });
    document.querySelector(".close-modal").onclick = () => { document.getElementById("checkout-modal").style.display = "none"; };
    document.getElementById("order-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("r-name").value;
        const email = document.getElementById("r-email").value;
        const phone = document.getElementById("r-phone").value;
        const address = document.getElementById("r-addr").value;
        const payment = document.getElementById("r-pay").value;
        const finalTotal = parseInt(document.getElementById("cart-total").innerText);

        cart.forEach(item => {
            const book = books.find(b => b.id === item.id);
            if(book) book.stock -= item.qty;
        });
        saveBooks(books); 

        const newOrder = {
            id: Date.now(), user: getCurrentUser().username, date: new Date().toISOString().split('T')[0],
            items: cart, total: finalTotal, info: { name, email, phone, address, payment }, status: "處理中" 
        };
        const orders = getOrders();
        orders.unshift(newOrder); 
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cart");

        if(user.isNew) {
            let users = getUsers();
            const idx = users.findIndex(u => u.username === user.username);
            if(idx !== -1) {
                users[idx].isNew = false;
                saveUsers(users);
                updateSessionUser(users[idx]);
            }
        }
        alert("訂單已成立！"); window.location.href = "order_history.html"; 
    });
}

// 賣家頁面
function initSeller() {
    const params = new URLSearchParams(window.location.search);
    const sellerId = params.get("user");
    const users = getUsers();
    const seller = users.find(u => u.username === sellerId);
    if (!seller) return;
    document.getElementById("s-avatar").innerText = seller.avatar;
    document.getElementById("s-name").innerText = seller.name;
    document.getElementById("s-rating").innerText = seller.rating > 0 ? seller.rating + " ★" : "暫無評價";
    document.getElementById("s-reviews").innerText = seller.reviews + " 則評價";
    const books = getBooks();
    const container = document.getElementById("seller-books");
    books.filter(b => b.sellerId === sellerId).forEach(b => container.innerHTML += createBookCard(b));

    // 動態插入賣家評論區
    const main = document.querySelector("main");
    const sellerReviewHTML = `
        <div class="seller-review-section review-section">
            <h3 style="margin-bottom:20px; border-left:4px solid var(--accent-gold); padding-left:10px;">賣家評分</h3>
            <div class="review-item">
                <span class="review-user">匿名學生</span>
                <span class="review-rating">★★★★★</span>
                <p class="review-content">送貨速度很快，交易愉快！</p>
            </div>
            <div style="margin-top:20px;">
                <div style="margin-bottom:10px;">
                    <label>賣家評分：</label>
                    <select id="seller-score" class="rating-select">
                        <option value="5">★★★★★ (5星)</option>
                        <option value="4">★★★★☆ (4星)</option>
                        <option value="3">★★★☆☆ (3星)</option>
                        <option value="2">★★☆☆☆ (2星)</option>
                        <option value="1">★☆☆☆☆ (1星)</option>
                    </select>
                </div>
                <textarea id="seller-review-text" rows="3" placeholder="寫下對賣家的評論..." style="width:100%; padding:10px; border-radius:5px; margin-bottom:10px; font-family: inherit;"></textarea>
                <button class="btn" onclick="submitSellerReview()" style="width:auto;">送出評論</button>
            </div>
        </div>
    `;
    main.insertAdjacentHTML('beforeend', sellerReviewHTML);

    window.submitSellerReview = () => {
        const user = getCurrentUser();
        if (!user) { alert("請先登入才能評論！"); return; }
        const text = document.getElementById("seller-review-text").value;
        const score = document.getElementById("seller-score").value;
        if (text.trim() === "") { alert("請輸入內容"); return; }
        
        const stars = "★".repeat(score) + "☆".repeat(5 - score);
        const reviewSection = document.querySelector(".seller-review-section");
        const newReview = document.createElement("div");
        newReview.className = "review-item";
        newReview.innerHTML = `
            <span class="review-user">${user.name}</span>
            <span class="review-rating">${stars}</span>
            <p class="review-content">${text}</p>
        `;
        reviewSection.querySelector("h3").insertAdjacentElement("afterend", newReview);
        document.getElementById("seller-review-text").value = "";
        alert("評論已送出！");
    };
}

// 訂單歷史頁
function initOrderHistory() {
    const user = getCurrentUser();
    if(!user) { alert("請先登入"); window.location.href="login.html"; return; }
    const container = document.getElementById("order-list");
    const orders = getOrders().filter(o => o.user === user.username).reverse();
    const books = getBooks();
    if(orders.length === 0) { container.innerHTML = "<tr><td colspan='6' style='text-align:center; color:#888;'>尚無訂單紀錄</td></tr>"; return; }
    orders.forEach(order => {
        const itemsStr = order.items.map(item => {
            const book = books.find(b => b.id === item.id);
            return book ? `${book.title} x${item.qty}` : `未知商品 x${item.qty}`;
        }).join("<br>");
        let statusClass = "status-shipping";
        if(order.status === "處理中") statusClass = "status-pending";
        if(order.status === "已退貨") statusClass = "status-cancelled";
        let actionBtn = "-";
        if (order.status === "處理中") { actionBtn = `<button class="return-btn" onclick="returnOrder(${order.id})">申請退貨</button>`; }
        container.innerHTML += `
            <tr>
                <td>${order.date}<br><small style="color:#888">#${order.id}</small></td>
                <td>${itemsStr}</td>
                <td>NT$ ${order.total}</td>
                <td><span class="status-badge ${statusClass}">${order.status}</span></td>
                <td>${order.info.payment}</td>
                <td style="text-align:center;">${actionBtn}</td>
            </tr>
        `;
    });
}

// 其他頁面
function initRegister() {
    document.getElementById("reg-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("r-id").value;
        const name = document.getElementById("r-name").value;
        const pwd = document.getElementById("r-pwd").value;
        let users = getUsers();
        if (users.find(u => u.username === id)) { alert("已註冊！"); return; }
        users.push({ username: id, password: pwd, name: name, rating: 0, reviews: 0, avatar: name[0], email: "", isNew: true });
        saveUsers(users);
        alert("註冊成功！首購將享有免運優惠！"); 
        window.location.href = "login.html";
    });
}

function initLogin() {
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("l-id").value;
        const pwd = document.getElementById("l-pwd").value;
        const users = getUsers();
        const user = users.find(u => u.username === id && u.password === pwd);
        if (user) {
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            alert("登入成功！");
            window.location.href = "shop.html"; 
        } else {
            alert("帳號或密碼錯誤！");
        }
    });
}

function initPublish() {
    const user = getCurrentUser();
    if (!user) { alert("請先登入"); window.location.href="login.html"; return; }
    document.getElementById("publish-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("p-title").value;
        const price = parseInt(document.getElementById("p-price").value);
        const imgInput = document.getElementById("p-image").value;
        const tagInput = document.getElementById("p-tags").value;
        const desc = document.getElementById("p-desc").value;
        const books = getBooks();
        const newBook = {
            id: Date.now(), title: title, price: price, stock: 1, sellerId: user.username,
            tags: tagInput.split(/[,，]/).map(t => t.trim()).filter(t => t !== ""),
            image: imgInput.trim() === "" ? "../assets/images/book0.jpg" : imgInput,
            desc: desc
        };
        books.unshift(newBook);
        saveBooks(books);
        alert("發布成功！"); window.location.href = "shop.html";
    });
}


/* 全域動作處理 (Global Action Handlers)
   掛載在 Window 物件上的函數，供 HTML onClick 呼叫 */

// 加入購物車
function addToCart(bookId, qty = 1) {
    const user = getCurrentUser();
    const books = getBooks();
    const book = books.find(b => b.id === bookId);
    if (user && user.username === book.sellerId) { alert("不能購買自己上架的書籍喔！"); return; }
    let cart = getCart();
    const existingItem = cart.find(item => item.id === bookId);
    const currentCartQty = existingItem ? existingItem.qty : 0;
    if (currentCartQty + qty > book.stock) { alert(`庫存不足！`); return; }
    if (existingItem) existingItem.qty += qty;
    else cart.push({ id: bookId, qty: qty });
    saveCart(cart);
    updateCartCount();
    alert(`已加入購物車！`);
}

// 訂單退貨
window.returnOrder = (orderId) => {
    if(!confirm("確定要退貨嗎？退貨後庫存將會釋出。")) return;
    let orders = getOrders();
    let books = getBooks();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return;
    const order = orders[orderIndex];
    if (order.status !== "處理中") { alert("此訂單狀態無法退貨！"); return; }
    order.items.forEach(item => {
        const book = books.find(b => b.id === item.id);
        if (book) book.stock += item.qty;
    });
    orders[orderIndex].status = "已退貨";
    localStorage.setItem("orders", JSON.stringify(orders));
    saveBooks(books);
    alert("退貨成功！");
    location.reload();
};

// 刪除書籍 (管理員/賣家)
window.deleteBook = (id) => {
    if(!confirm("確定要下架這本書嗎？")) return;
    let books = getBooks();
    books = books.filter(b => b.id !== id);
    saveBooks(books);
    alert("已刪除！");
    location.reload();
};