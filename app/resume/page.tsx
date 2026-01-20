import Nav from '@/app/components/Nav'

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-background">
            <Nav />

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-4xl font-bold text-foreground">
                        Resume
                    </h1>

                    <a
                        href="/Parmeet_Virdi_Resume.pdf"
                        download="Parmeet_Virdi_Resume.pdf"
                        className="px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors font-medium"
                    >
                        Download PDF
                    </a>
                </div>

                <div className="border border-border rounded-lg bg-neutral-900 p-4">
                    <iframe
                        src="/Parmeet_Virdi_Resume.pdf#zoom=100"
                        title="Parmeet Virdi Resume"
                        className="w-full h-[1250px] block bg-white"
                        scrolling="no"
                    />
                </div>
            </div>
        </div>
    )
}
