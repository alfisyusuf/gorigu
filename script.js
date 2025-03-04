// URL Google Apps Script web app - GANTI DENGAN URL ANDA
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyPZmbtwhublsj5nNNJ9hrBHI4XvsrOConmNQ3IdViG5_pT6HOiOa_1xa7RdpSOhcwq/exec';

// Variabel untuk menyimpan data
let products = [];
let cart = [];

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Load produk
    loadProducts();
    
    // Setup tombol keranjang
    document.getElementById('cart-toggle').addEventListener('click', function() {
        toggleSection('cart-section');
    });
    
    // Setup tombol checkout
    document.getElementById('checkout-button').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Keranjang belanja kosong');
            return;
        }
        
        document.getElementById('checkout-total').textContent = formatRupiah(calculateTotal());
        toggleSection('checkout-section');
    });
    
    // Setup form checkout
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        processCheckout();
    });
});

// Load produk dari Google Sheets
async function loadProducts() {
    try {
        const response = await fetch(`${WEBAPP_URL}?action=getProducts`);
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = 
            '<p>Gagal memuat produk. Silakan coba lagi nanti.</p>';
    }
}

// Tampilkan produk
function displayProducts() {
    const container = document.getElementById('products-container');
    
    if (products.length === 0) {
        container.innerHTML = '<p>Tidak ada produk tersedia</p>';
        return;
    }
    
    let html = '<div class="product-grid">';
    
    products.forEach(product => {
        html += `
            <div class="product-card">
                <img src="${product.gambar_url}" alt="${product.nama_produk}">
                <h3>${product.nama_produk}</h3>
                <p class="price">${formatRupiah(product.harga)}</p>
                <p>${product.deskripsi}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    Tambah ke Keranjang
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Tambahkan event listeners untuk tombol "Tambah ke Keranjang"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Tambahkan item ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.nama_produk,
            price: product.harga,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

// Update tampilan keranjang
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total-amount');
    
    // Update jumlah item
    let totalItems = 0;
    cart.forEach(item => totalItems += item.quantity);
    cartCount.textContent = totalItems;
    
    // Jika keranjang kosong
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Keranjang kosong</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }
    
    // Tampilkan item di keranjang
    let html = '<ul class="cart-list">';
    
    cart.forEach((item, index) => {
        html += `
            <li>
                <span>${item.name} x ${item.quantity}</span>
                <span>${formatRupiah(item.price * item.quantity)}</span>
                <button class="remove-item" data-index="${index}">×</button>
            </li>
        `;
    });
    
    html += '</ul>';
    cartItems.innerHTML = html;
    
    // Update total
    cartTotal.textContent = formatRupiah(calculateTotal());
    
    // Tambahkan event listener untuk tombol hapus
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCartDisplay();
        });
    });
}

// Hitung total keranjang
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Format angka ke format Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Toggle tampilan section
function toggleSection(sectionId) {
    const sections = ['products-section', 'cart-section', 'checkout-section'];
    
    sections.forEach(id => {
        if (id === sectionId) {
            document.getElementById(id).classList.remove('hidden');
        } else {
            document.getElementById(id).classList.add('hidden');
        }
    });
}

// Proses checkout
async function processCheckout() {
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    
    if (!nama || !email) {
        alert('Mohon isi semua field yang diperlukan');
        return;
    }
    
    const orderId = 'ORDER-' + Date.now();
    const totalAmount = calculateTotal();
    
    const orderData = {
        orderId: orderId,
        nama: nama,
        email: email,
        totalAmount: totalAmount
    };
    
    try {
        document.getElementById('pay-button').disabled = true;
        document.getElementById('pay-button').textContent = 'Memproses...';
        
        const response = await fetch(WEBAPP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'createOrder',
                orderData: orderData
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error || 'Gagal membuat pesanan');
        }
        
        // Buka Snap untuk pembayaran
        window.snap.pay(result.token, {
            onSuccess: function(result) {
                // Pembayaran berhasil
                handlePaymentSuccess(result, orderId);
            },
            onPending: function(result) {
                // Pembayaran pending
                alert('Pembayaran sedang diproses. Silakan cek email Anda untuk instruksi lebih lanjut.');
                window.location.href = 'success.html?order_id=' + orderId + '&status=pending';
            },
            onError: function(result) {
                // Pembayaran gagal
                alert('Pembayaran gagal. Silakan coba lagi.');
                document.getElementById('pay-button').disabled = false;
                document.getElementById('pay-button').textContent = 'Bayar Sekarang';
            },
            onClose: function() {
                // Customer menutup popup tanpa menyelesaikan pembayaran
                document.getElementById('pay-button').disabled = false;
                document.getElementById('pay-button').textContent = 'Bayar Sekarang';
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan: ' + error.message);
        document.getElementById('pay-button').disabled = false;
        document.getElementById('pay-button').textContent = 'Bayar Sekarang';
    }
}

// Handle pembayaran berhasil
function handlePaymentSuccess(result, orderId) {
    // Kosongkan keranjang
    cart = [];
    updateCartDisplay();
    
    // Redirect ke halaman sukses
    window.location.href = 'success.html?order_id=' + orderId + '&status=success';
}

