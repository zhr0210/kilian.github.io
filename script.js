// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// 滚动动画 - 当元素进入视口时显示
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
const animatedElements = document.querySelectorAll('.portfolio-item, .about-content, .contact-content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 平滑滚动 - 为导航链接添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 联系表单提交处理
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // 简单验证
    if (!name || !email || !message) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 模拟表单提交
    const submitBtn = this.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 模拟异步请求
    setTimeout(() => {
        // 重置表单
        this.reset();
        submitBtn.textContent = '发送成功！';
        
        // 恢复按钮状态
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// 图片加载优化 - 懒加载效果
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                imgObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imgObserver.observe(img);
    });
}

// 页面加载完成后的动画效果
window.addEventListener('load', function() {
    // 移除加载动画
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
    
    // 为英雄区域添加打字效果
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    }
});

// 鼠标移动视差效果 - 为英雄区域添加轻微的视差效果
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        hero.style.backgroundPosition = `${50 - x * 5}% ${50 - y * 5}%`;
    });
}

// 作品集项目点击效果
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const overlay = this.querySelector('.portfolio-overlay');
        if (overlay.style.opacity === '1') {
            // 如果已经显示，点击关闭
            overlay.style.opacity = '0';
            const info = this.querySelector('.portfolio-info');
            info.style.transform = 'translateY(20px)';
        }
    });
});

// 统计数字动画
const animateNumbers = function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                number.textContent = target + '+';
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
};

// 当统计数字进入视口时开始动画
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 移动端菜单切换（如果需要）
// 这里可以添加移动端菜单的切换功能

// 防止表单重复提交
let isSubmitting = false;
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    
    isSubmitting = true;
    
    // 表单提交逻辑...
    
    // 提交完成后重置isSubmitting
    setTimeout(() => {
        isSubmitting = false;
    }, 2000);
});