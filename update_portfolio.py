import re

def update_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    new_mobile_nav = """        mobileNav.innerHTML = `
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#certificates">Certificates</a>
            <a href="#contact">Contact</a>
        `;"""
    
    content = re.sub(r'mobileNav\.innerHTML = `.*?`;', new_mobile_nav, content, flags=re.DOTALL)
    
    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(content)


def update_style_css():
    with open('style.css', 'r', encoding='utf-8') as f:
        content = f.read()

    new_css = """
/* New Skills Category Layout */
.skills-category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.skill-category-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
}

.skill-category-card.visible {
    opacity: 1;
    transform: translateY(0);
}

.skill-category-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: #667eea;
}

body.light-mode .skill-category-card:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.skill-category-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
}

.category-icon {
    font-size: 2rem;
    color: #667eea;
}

.category-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
}

.skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    font-size: 0.95rem;
    color: var(--text-secondary);
    transition: all 0.3s ease;
}

body.light-mode .skill-tag {
    background: rgba(0, 0, 0, 0.03);
}

.skill-tag:hover {
    color: var(--text-primary);
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
}

/* Projects 3-Column Layout */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    margin-top: 3rem;
}

@media (max-width: 1024px) {
    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}

.project-card {
    position: relative;
    margin-bottom: 0;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
}

/* Certificates Layout */
.certificates-section {
    padding: 8rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
}

.certificates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    margin-top: 3rem;
}

.certificate-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
}

.certificate-card.visible {
    opacity: 1;
    transform: translateY(0);
}

.certificate-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: #667eea;
}

.certificate-image {
    width: 100%;
    height: 200px;
    background: #2a2a2a;
    display: flex;
    align-items: center;
    justify-content: center;
}

.certificate-content {
    padding: 2rem;
}

.certificate-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.certificate-issuer {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.btn-disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
}

.about-profile-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    border: 2px solid var(--border-color);
}

.about-profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
"""
    if "skills-category-grid" not in content:
        content += new_css

    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(content)

def update_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Nav
    old_nav = """            <div class="hidden md:flex gap-8 items-center">
                <a href="#home" class="nav-link" aria-label="Navigate to home section">Home</a>
                <a href="#skills" class="nav-link" aria-label="Navigate to skills section">Skills</a>
                <a href="#services" class="nav-link" aria-label="Navigate to services section">Services</a>
                <a href="#projects" class="nav-link" aria-label="Navigate to projects section">Projects</a>
                <a href="#about" class="nav-link" aria-label="Navigate to about section">About</a>
                <a href="#contact" class="nav-link" aria-label="Navigate to contact section">Contact</a>"""
                
    new_nav = """            <div class="hidden md:flex gap-8 items-center">
                <a href="#home" class="nav-link" aria-label="Navigate to home section">Home</a>
                <a href="#about" class="nav-link" aria-label="Navigate to about section">About</a>
                <a href="#skills" class="nav-link" aria-label="Navigate to skills section">Skills</a>
                <a href="#projects" class="nav-link" aria-label="Navigate to projects section">Projects</a>
                <a href="#certificates" class="nav-link" aria-label="Navigate to certificates section">Certificates</a>
                <a href="#contact" class="nav-link" aria-label="Navigate to contact section">Contact</a>
                <a href="./assets/resume.pdf" target="_blank" rel="noopener noreferrer" class="nav-link" style="color: #667eea; font-weight: bold;" aria-label="View Resume">Resume</a>"""
                
    if old_nav in content:
        content = content.replace(old_nav, new_nav)
    
    # 2. Update Hero
    old_hero_btn = '<a href="#projects" class="cta-btn" aria-label="View my portfolio projects">View My Work</a>'
    new_hero_btn = '<a href="#projects" class="cta-btn" aria-label="View my portfolio projects">View My Work</a>\n            <a href="./assets/resume.pdf" target="_blank" rel="noopener noreferrer" class="cta-btn" style="margin-left: 1rem; background: transparent; color: var(--text-primary);" aria-label="View Resume">View Resume</a>'
    
    if old_hero_btn in content:
        content = content.replace(old_hero_btn, new_hero_btn)

    # 3. Replace entire sections (Projects, Skills, Services, About)
    def extract_section(section_id, html_content):
        start = html_content.find(f'<section id="{section_id}"')
        if start == -1: return ""
        end = html_content.find('</section>', start) + 10
        return html_content[start:end]

    old_skills = extract_section('skills', content)
    old_services = extract_section('services', content)
    old_projects = extract_section('projects', content)
    old_about = extract_section('about', content)

    # Create new Skills
    new_skills = """    <!-- Skills Section -->
    <section id="skills" class="skills-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" class="section-title">Expertise</h2>
        <div class="skills-category-grid">
            <!-- Frontend Development -->
            <article class="skill-category-card skill-card">
                <div class="skill-category-header">
                    <i class="fas fa-desktop category-icon"></i>
                    <h3 class="category-title">Frontend Development</h3>
                </div>
                <div class="skill-tags">
                    <span class="skill-tag"><i class="fab fa-html5" style="color: #E34F26;"></i> HTML5</span>
                    <span class="skill-tag"><i class="fab fa-css3-alt" style="color: #1572B6;"></i> CSS3</span>
                    <span class="skill-tag"><i class="fab fa-js" style="color: #F7DF1E;"></i> JavaScript</span>
                    <span class="skill-tag"><i class="fab fa-react" style="color: #61DAFB;"></i> React.js</span>
                    <span class="skill-tag"><i class="fab fa-bootstrap" style="color: #7952B3;"></i> Bootstrap</span>
                    <span class="skill-tag"><i class="fas fa-wind" style="color: #38B2AC;"></i> Tailwind CSS</span>
                    <span class="skill-tag"><i class="fas fa-magic" style="color: #88CE02;"></i> GSAP</span>
                </div>
            </article>

            <!-- Backend & Database -->
            <article class="skill-category-card skill-card">
                <div class="skill-category-header">
                    <i class="fas fa-server category-icon"></i>
                    <h3 class="category-title">Backend & Database</h3>
                </div>
                <div class="skill-tags">
                    <span class="skill-tag"><i class="fab fa-node" style="color: #339933;"></i> Node.js</span>
                    <span class="skill-tag"><i class="fas fa-server" style="color: #fff;"></i> Express.js</span>
                    <span class="skill-tag"><i class="fas fa-database" style="color: #47A248;"></i> MongoDB</span>
                    <span class="skill-tag"><i class="fas fa-exchange-alt" style="color: #007ACC;"></i> REST APIs</span>
                    <span class="skill-tag"><i class="fas fa-fire" style="color: #FFCA28;"></i> Firebase</span>
                </div>
            </article>

            <!-- Tools & Deployment -->
            <article class="skill-category-card skill-card">
                <div class="skill-category-header">
                    <i class="fas fa-tools category-icon"></i>
                    <h3 class="category-title">Tools & Deployment</h3>
                </div>
                <div class="skill-tags">
                    <span class="skill-tag"><i class="fab fa-github" style="color: #fff;"></i> Git & GitHub</span>
                    <span class="skill-tag"><i class="fas fa-triangle-exclamation" style="color: #fff;"></i> Vercel</span>
                    <span class="skill-tag"><i class="fas fa-cloud" style="color: #46E3B7;"></i> Render</span>
                    <span class="skill-tag"><i class="fas fa-cloud-upload-alt" style="color: #3448C5;"></i> Cloudinary</span>
                    <span class="skill-tag"><i class="fas fa-code" style="color: #007ACC;"></i> VS Code</span>
                </div>
            </article>
        </div>
    </section>"""

    # Create new Projects
    new_projects = """    <section id="projects" class="projects-section" aria-labelledby="projects-heading">
        <h2 id="projects-heading" class="section-title">Featured Projects</h2>
        <p style="text-align: center; color: var(--text-secondary); font-size: 1.15rem; max-width: 700px; margin: -2rem auto 3rem;">
            A selection of my recent work and personal projects
        </p>

        <div class="projects-grid">
            <!-- Project 1 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #1f2937 0%, #000000 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-clock" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">Zelmior Premium Watches</h3>
                        <p class="project-description">Premium watch e-commerce experience with a modern luxury-focused interface and responsive design.</p>
                        <div class="project-tags">
                            <span class="tag">React</span>
                            <span class="tag">JavaScript</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link btn-disabled" aria-label="Demo Coming Soon">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Demo Coming Soon</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/Zelmior-Premium-Watches/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Project 2 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #059669 0%, #065f46 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-chart-line" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">SEO Rank Tracker</h3>
                        <p class="project-description">Advanced SEO rank tracking tool for monitoring website performance and keyword rankings.</p>
                        <div class="project-tags">
                            <span class="tag">React</span>
                            <span class="tag">Node.js</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link btn-disabled" aria-label="Demo Coming Soon">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Demo Coming Soon</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/SEO-Rank-Tracker-Website/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Project 3 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-graduation-cap" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">FYP — Final Year Project</h3>
                        <p class="project-description">Comprehensive final year academic project demonstrating advanced MERN stack capabilities.</p>
                        <div class="project-tags">
                            <span class="tag">MERN Stack</span>
                            <span class="tag">JavaScript</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link btn-disabled" aria-label="Demo Coming Soon">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Demo Coming Soon</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/FYP-Final-Year-Project/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Project 4 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-shopping-cart" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">E-Commerce Website</h3>
                        <p class="project-description">Feature-rich e-commerce platform with product browsing, cart functionality, and secure checkout.</p>
                        <div class="project-tags">
                            <span class="tag">React</span>
                            <span class="tag">CSS</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link btn-disabled" aria-label="Demo Coming Soon">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Demo Coming Soon</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/E-commerce-Website/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Project 5 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-briefcase" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">Web Agency Template</h3>
                        <p class="project-description">Professional web agency website with services showcase, portfolio gallery, and modern animations.</p>
                        <div class="project-tags">
                            <span class="tag">HTML5</span>
                            <span class="tag">Tailwind</span>
                        </div>
                        <div class="project-links">
                            <a href="http://webagency-template.netlify.app/" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Live Demo</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/Webagency-Template-Assignment-8/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Project 6 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #ea580c 0%, #9a3412 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-dumbbell" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">GYM Website</h3>
                        <p class="project-description">Complete gym website with membership plans, trainer profiles, and responsive design.</p>
                        <div class="project-tags">
                            <span class="tag">HTML5</span>
                            <span class="tag">CSS3</span>
                        </div>
                        <div class="project-links">
                            <a href="https://hackaton-gym-website.netlify.app/" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Live Demo</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/Hackaton-GYM-Website/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Project 7 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-couch" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">Figma Furniture Website</h3>
                        <p class="project-description">Pixel-perfect Figma to HTML/CSS conversion for a modern furniture brand.</p>
                        <div class="project-tags">
                            <span class="tag">Figma</span>
                            <span class="tag">CSS3</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link btn-disabled" aria-label="Demo Coming Soon">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Demo Coming Soon</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/Figma-Furniture-Website/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Project 8 -->
            <article class="project-card">
                <div class="project-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #10b981 0%, #047857 100%); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-store" style="font-size: 80px; opacity: 0.3;" aria-hidden="true"></i>
                    </div>
                    <div class="project-overlay">
                        <h3 class="project-title">MERN Stack E-Commerce</h3>
                        <p class="project-description">MERN stack e-commerce solution with admin dashboard, Stripe integration, and user authentication.</p>
                        <div class="project-tags">
                            <span class="tag">MongoDB</span>
                            <span class="tag">Express</span>
                            <span class="tag">React</span>
                            <span class="tag">Node.js</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link btn-disabled" aria-label="Demo Coming Soon">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                <span>Demo Coming Soon</span>
                            </a>
                            <a href="https://github.com/AyanQureshi16/MERN-Stack-E-Commerce-Web/tree/main" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Source Code">
                                <i class="fab fa-github" aria-hidden="true"></i>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>"""

    new_certificates = """    <!-- Certificates Section -->
    <section id="certificates" class="certificates-section" aria-labelledby="certificates-heading">
        <h2 id="certificates-heading" class="section-title">Certificates</h2>
        <div class="certificates-grid">
            <article class="certificate-card skill-card">
                <div class="certificate-image">
                    <i class="fas fa-certificate" style="font-size: 80px; color: #ffd700;"></i>
                </div>
                <div class="certificate-content">
                    <h3 class="certificate-title">Certificate 1</h3>
                    <p class="certificate-issuer">Issuing Organization</p>
                    <a href="#" class="project-link btn-disabled" aria-label="View Certificate 1">
                        <i class="fas fa-eye" aria-hidden="true"></i>
                        <span>View Certificate</span>
                    </a>
                </div>
            </article>
            
            <article class="certificate-card skill-card">
                <div class="certificate-image">
                    <i class="fas fa-certificate" style="font-size: 80px; color: #ffd700;"></i>
                </div>
                <div class="certificate-content">
                    <h3 class="certificate-title">Certificate 2</h3>
                    <p class="certificate-issuer">Issuing Organization</p>
                    <a href="#" class="project-link btn-disabled" aria-label="View Certificate 2">
                        <i class="fas fa-eye" aria-hidden="true"></i>
                        <span>View Certificate</span>
                    </a>
                </div>
            </article>

            <article class="certificate-card skill-card">
                <div class="certificate-image">
                    <i class="fas fa-certificate" style="font-size: 80px; color: #ffd700;"></i>
                </div>
                <div class="certificate-content">
                    <h3 class="certificate-title">Certificate 3</h3>
                    <p class="certificate-issuer">Issuing Organization</p>
                    <a href="#" class="project-link btn-disabled" aria-label="View Certificate 3">
                        <i class="fas fa-eye" aria-hidden="true"></i>
                        <span>View Certificate</span>
                    </a>
                </div>
            </article>
        </div>
    </section>"""

    new_about = """    <section id="about" class="about-section" aria-labelledby="about-heading">
        <div class="about-content">
            <div class="about-text">
                <h2 id="about-heading">About Me</h2>
                <p>Hi, I'm Ayan Shahid, a passionate self-taught MERN Stack Developer from Pakistan. I started coding at a young age and fell in love with the process of turning ideas into real, functional websites.</p>
                <p>I specialize in building responsive, user-friendly web experiences using modern technologies and best practices. Currently, I'm focused on learning advanced JavaScript concepts and exploring new frontend frameworks.</p>
                <p>Every project I build is an opportunity to learn something new and push my skills further. I believe in writing clean, maintainable code and creating interfaces that users love to interact with.</p>
            </div>
            <div>
                <div class="about-profile-wrapper">
                    <img src="./assets/profile.jpg" alt="Ayan Shahid Profile Photo" class="about-profile-img" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'width: 100%; height: 500px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 120px; opacity: 0.7;\\'><i class=\\'fas fa-user\\' aria-hidden=\\'true\\'></i></div>';">
                </div>
            </div>
        </div>
    </section>"""

    if old_skills and old_services and old_projects and old_about:
        new_combined = new_about + "\n\n" + new_skills + "\n\n" + new_projects + "\n\n" + new_certificates
        
        start_idx = content.find('<section id="skills"')
        end_idx = content.find('</section>', content.find('<section id="about"')) + 10
        
        if start_idx != -1 and end_idx != -1:
            content = content[:start_idx] + new_combined + content[end_idx:]

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    update_app_js()
    update_style_css()
    update_index_html()
