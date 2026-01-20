import Nav from '../components/Nav'

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Nav />
            
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-4xl font-bold text-[#e5e5e5]">Resume</h1>
                    <a
                        href="/Parmeet_Virdi_Resume.pdf"
                        download="Parmeet_Virdi_Resume.pdf"
                        className="px-6 py-3 bg-[#3b82f6] text-white rounded hover:bg-[#2563eb] transition-colors font-medium"
                    >
                        Download PDF
                    </a>
                </div>
                
                <div className="border border-[#262626] rounded-lg overflow-hidden bg-[#0a0a0a]">
                    <iframe
                        src="/Parmeet_Virdi_Resume.pdf"
                        className="w-full h-[calc(100vh-250px)] min-h-[800px]"
                        title="Parmeet Virdi Resume"
                    />
                </div>
            </div>
        </div>
    )
}

