"use client";

export default function Footer() {
    return (
        <footer className="w-full bg-[#1a1128]/80 backdrop-blur-xl border-t border-white/15 text-white py-10 px-6 font-sans">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
                
                <div className="flex flex-col gap-2 max-w-xs">
                    <h2 className="text-lg font-bold text-pink-400 tracking-wide">About Us</h2>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-medium text-justify">
                        We provide a smart navigation platform powered by risk analysis and machine learning to help users plan safer travel routes.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-pink-400 tracking-wide">Our Teams at SISTECH FINAL PROJECT</h2>
                    <div className="text-xs md:text-sm text-gray-300 space-y-1.5 font-medium">
                        <p><strong className="text-white">Celine & Denisa</strong> as UI/UX Designer</p>
                        <p><strong className="text-white">Chelsea & Corinthia</strong> as Frontend Engineer</p>
                        <p><strong className="text-white">Nasya & Sustri</strong> as MLOps</p>
                        <p><strong className="text-white">Revia & Shera</strong> as Business Analyst and Strategies</p>
                        <p><strong className="text-white">Nadila & Nadhien</strong> as Project Manager</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}