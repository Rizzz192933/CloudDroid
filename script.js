const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");
const toast = document.getElementById("toast");

let toastTimeout;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

// Navigasi halaman
function showPage(pageId) {
    const target = document.getElementById(pageId);

    if (!target) return;

    pages.forEach(page => {
        page.classList.toggle("active", page.id === pageId);
    });

    navItems.forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.page === pageId
        );
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navItems.forEach(item => {
    item.addEventListener("click", () => {
        showPage(item.dataset.page);
    });
});

// Tombol yang menuju halaman tertentu
document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

// Jam pada pratinjau
function updatePhoneClock() {
    const now = new Date();

    document.getElementById("phoneTime").textContent =
        now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

    document.getElementById("phoneDate").textContent =
        now.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short"
        });
}

updatePhoneClock();
setInterval(updatePhoneClock, 1000);

// Membuka GitHub
function openGitHubNewRepo() {
    window.open(
        "https://github.com/new",
        "_blank",
        "noopener,noreferrer"
    );
}

document.getElementById("githubButton")
    .addEventListener("click", openGitHubNewRepo);

document.getElementById("createRepoButton")
    .addEventListener("click", openGitHubNewRepo);

// Hubungkan Cloud Phone
document.getElementById("connectButton")
    .addEventListener("click", () => {
        showToast(
            "Belum terhubung: server Android belum dikonfigurasi."
        );

        document.getElementById("connectMessage").textContent =
            "Belum ada server Android yang terhubung.";

        document.getElementById("deviceStatus").textContent =
            "Belum terhubung";
    });

// Browser eksternal
function openExternalUrl(value) {
    let url;

    try {
        url = new URL(value);
    } catch (error) {
        showToast("Alamat website tidak valid.");
        return;
    }

    if (url.protocol !== "https:" && url.protocol !== "http:") {
        showToast("Hanya alamat HTTP atau HTTPS yang diizinkan.");
        return;
    }

    window.open(url.href, "_blank", "noopener,noreferrer");
}

document.getElementById("browserForm")
    .addEventListener("submit", event => {
        event.preventDefault();

        const input = document.getElementById("urlInput");
        const value = input.value.trim();

        if (!value) {
            showToast("Masukkan alamat website.");
            return;
        }

        openExternalUrl(value);
    });

document.querySelectorAll("[data-url]").forEach(button => {
    button.addEventListener("click", () => {
        openExternalUrl(button.dataset.url);
    });
});

// Tema
function setTheme(isLight) {
    document.body.classList.toggle("light", isLight);

    document.getElementById("themeButton").textContent =
        isLight ? "☾" : "☼";

    document.getElementById("settingsThemeButton").textContent =
        isLight ? "Nonaktif" : "Aktif";
}

function toggleTheme() {
    setTheme(!document.body.classList.contains("light"));
}

document.getElementById("themeButton")
    .addEventListener("click", toggleTheme);

document.getElementById("settingsThemeButton")
    .addEventListener("click", toggleTheme);

// Reset tampilan
document.getElementById("resetButton")
    .addEventListener("click", () => {
        setTheme(false);
        showPage("homePage");

        document.getElementById("urlInput").value = "";

        document.getElementById("connectMessage").textContent =
            "Belum ada server Android yang dikonfigurasi.";

        document.getElementById("deviceStatus").textContent =
            "Belum terhubung";

        showToast("Tampilan berhasil direset.");
    });
