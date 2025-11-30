import { useState } from 'react';
import {
    Menu, X, ArrowRight, Play, Shield,
    Users, Zap, Globe, ChevronDown,
    ChevronUp, Lock, CreditCard, PieChart
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">AttendoX</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                        <a href="#product" className="hover:text-indigo-600 transition">Product</a>
                        <a href="#solutions" className="hover:text-indigo-600 transition">Solutions</a>
                        <a href="#resources" className="hover:text-indigo-600 transition">Resources</a>
                    </div>

                    {/* CTAs */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow-lg shadow-indigo-200" onClick={() => window.location.href = "/auth/sign-in"}>
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
                    <a href="#product" className="block text-gray-600 font-medium">Product</a>
                    <a href="#solutions" className="block text-gray-600 font-medium">Solutions</a>
                    <div className="pt-4 flex flex-col gap-3">
                        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium" onClick={() => window.location.href = "/auth/sign-in"} >Get Started</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                    Effortless payroll, seamless success <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        simplify your pay process today
                    </span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
                    We combine automated hiring, payroll and compliance in one platform, so you can focus on growing your business while we handle the rest.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-indigo-200 transition flex items-center justify-center gap-2">
                        Start Free Trial
                    </button>
                    <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-full font-medium transition flex items-center justify-center gap-2">
                        <Play size={18} fill="currentColor" /> Watch Demo
                    </button>
                </div>

                {/* Dashboard Mockup */}
                <div className="relative mx-auto max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="p-2 md:p-6 bg-gray-50">
                        {/* Mock Content imitating the image dashboard */}
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-3 bg-white p-4 rounded-xl shadow-sm h-full flex flex-col gap-4">
                                <div className="h-2 w-20 bg-gray-200 rounded" />
                                <div className="h-2 w-16 bg-gray-100 rounded" />
                                <div className="h-2 w-24 bg-gray-100 rounded" />
                                <div className="mt-auto h-20 w-full bg-indigo-50 rounded-lg" />
                            </div>
                            <div className="col-span-12 md:col-span-9 bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="h-4 w-32 bg-gray-200 rounded" />
                                    <div className="h-8 w-24 bg-indigo-600 rounded-lg" />
                                </div>
                                <div className="flex items-end gap-4 h-48">
                                    {[40, 60, 30, 80, 55, 90, 45, 70].map((h, i) => (
                                        <div key={i} className="flex-1 bg-indigo-100 rounded-t-lg relative group">
                                            <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all group-hover:bg-indigo-600" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Proof Text */}
                <p className="mt-12 text-sm font-semibold text-gray-400 uppercase tracking-wider">Trusted by 4,000+ companies globally</p>
                <div className="mt-6 flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                    {/* Simple placeholders for logos */}
                    <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> GlobalTech</div>
                    <div className="flex items-center gap-2 font-bold text-xl"><Zap className="w-6 h-6" /> SparkSystems</div>
                    <div className="flex items-center gap-2 font-bold text-xl"><PieChart className="w-6 h-6" /> FinCorp</div>
                    <div className="flex items-center gap-2 font-bold text-xl"><Users className="w-6 h-6" /> PeopleFirst</div>
                </div>
            </div>
        </section>
    );
};

const Benefits = () => {
    const benefits = [
        {
            title: "Streamlined Payroll Processing",
            desc: "Automate tax calculations, filings, and end-of-year forms. Say goodbye to manual errors and hello to accuracy.",
            icon: <CreditCard className="w-6 h-6 text-indigo-600" />
        },
        {
            title: "Compliance Management",
            desc: "Stay compliant with automated tax filing and reporting. We handle the complexity of changing regulations for you.",
            icon: <Shield className="w-6 h-6 text-indigo-600" />
        },
        {
            title: "Employee Self-Service",
            desc: "Empower your team with a portal to view pay stubs, manage tax documents, and update personal info.",
            icon: <Users className="w-6 h-6 text-indigo-600" />
        }
    ];

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Benefits</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                        Revolutionizing the <span className="text-indigo-600">payroll management</span>
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                        Our platform simplifies the complex landscape of payroll, ensuring you have powerful algorithms and transparency at your fingertips.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Features = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute right-0 top-1/2 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">Features</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                        Powerful features for a seamless<br /> payroll experience
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="h-40 bg-gray-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                            {/* Abstract UI representation */}
                            <div className="absolute inset-x-8 bottom-[-20px] bg-white shadow-lg rounded-t-xl h-32 p-4">
                                <div className="flex gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                                    <div className="space-y-1">
                                        <div className="w-20 h-2 bg-gray-200 rounded" />
                                        <div className="w-12 h-2 bg-gray-100 rounded" />
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-indigo-100 rounded mt-4">
                                    <div className="w-2/3 h-full bg-indigo-500 rounded" />
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Payroll Overview</h3>
                        <p className="text-gray-500 mb-4">Get a clear, concise view of your payroll cycles, taxes, benefits, and expenses in one place.</p>
                        <a href="#" className="text-indigo-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight size={16} /></a>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="h-40 bg-gray-50 rounded-xl mb-6 flex items-center justify-center relative">
                            {/* Flowchart UI */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white shadow rounded-lg flex items-center justify-center text-gray-400"><Users size={16} /></div>
                                <div className="w-8 h-0.5 bg-gray-300 relative">
                                    <div className="absolute right-0 -top-1 w-2 h-2 border-r-2 border-t-2 border-gray-300 transform rotate-45" />
                                </div>
                                <div className="w-12 h-12 bg-indigo-600 shadow-lg rounded-full flex items-center justify-center text-white"><Zap size={20} /></div>
                                <div className="w-8 h-0.5 bg-gray-300 relative">
                                    <div className="absolute right-0 -top-1 w-2 h-2 border-r-2 border-t-2 border-gray-300 transform rotate-45" />
                                </div>
                                <div className="w-10 h-10 bg-white shadow rounded-lg flex items-center justify-center text-gray-400"><CreditCard size={16} /></div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Deposit & Integrations</h3>
                        <p className="text-gray-500 mb-4">Seamlessly integrate with your existing accounting software and automate deposits instantly.</p>
                        <a href="#" className="text-indigo-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight size={16} /></a>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="h-40 bg-gray-50 rounded-xl mb-6 p-6 flex items-end gap-3 justify-center">
                            <div className="w-8 h-12 bg-blue-200 rounded-t-md opacity-50" />
                            <div className="w-8 h-20 bg-indigo-300 rounded-t-md opacity-70" />
                            <div className="w-8 h-10 bg-gray-900 rounded-lg text-white text-xs flex items-center justify-center relative shadow-lg z-10 scale-110">
                                +24%
                            </div>
                            <div className="w-8 h-16 bg-blue-200 rounded-t-md opacity-50" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Analytics</h3>
                        <p className="text-gray-500 mb-4">Make data-driven decisions with real-time analytics dashboards that visualize your spending.</p>
                        <a href="#" className="text-indigo-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight size={16} /></a>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="h-40 bg-gray-50 rounded-xl mb-6 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-indigo-600">
                                <Lock size={32} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">High-level Security</h3>
                        <p className="text-gray-500 mb-4">We ensure your data is encrypted and secure with enterprise-grade security protocols.</p>
                        <a href="#" className="text-indigo-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">Learn more <ArrowRight size={16} /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "HR Manager at TechFlow",
            text: "AttendoX saved us hours of manual work every week. The interface is intuitive and the support is fantastic."
        },
        {
            name: "Michael Chen",
            role: "Founder, StartUp Inc",
            text: "The best investment we made this year. Compliance used to be a headache, now it's completely automated."
        },
        {
            name: "Jessica Lee",
            role: "Director of Ops, RetailGo",
            text: "Seamless onboarding for new employees and the direct deposit feature works like a charm. Highly recommend."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-12">
                    Hear from our happy clients who <br /> trust us for their payroll needs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="text-left bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full" /> {/* Avatar Placeholder */}
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                                    <p className="text-xs text-gray-500">{review.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = [
        "What features are included in the Basic Plan?",
        "How do we ensure compliance with payroll laws?",
        "Can I switch my plan anytime?",
        "What happens if we scale our team?",
        "Do you offer 24/7 support?"
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-4">Get the answers you're looking for</h2>
                <p className="text-center text-gray-500 mb-12">Everything you need to know about our payroll services.</p>

                <div className="space-y-4">
                    {questions.map((q, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition text-left"
                            >
                                <span className="font-medium text-gray-900">{q}</span>
                                {openIndex === i ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                            </button>
                            {openIndex === i && (
                                <div className="p-4 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                                    AttendoX provides a comprehensive suite of tools. For this specific question, our platform handles the heavy lifting automatically so you don't have to worry about manual inputs.
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Newsletter */}
                    <div className="md:col-span-5">
                        <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter to get our latest updates</h3>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Your email address" className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg flex-1 focus:outline-none focus:border-indigo-600" />
                            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition">Join</button>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">Features</a></li>
                            <li><a href="#" className="hover:text-white">Pricing</a></li>
                            <li><a href="#" className="hover:text-white">Integrations</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">About</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-xs font-bold">A</div>
                        <span className="font-bold text-lg">AttendoX</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © 2024 AttendoX Inc. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};


function Landing() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar />
            <Hero />
            <Benefits />
            <Features />
            <Testimonials />
            <FAQ />
            <Footer />
        </div>
    );
}

export default Landing;