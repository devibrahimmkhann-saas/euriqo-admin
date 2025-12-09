import MainContainer from '@/components/layouts/main-container';
import Sidebar from '@/components/layouts/sidebar';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import ProtectedRoute from '@/components/auth/protected-route';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute requireAuth={true}>
            <div className="relative">
                <MainContainer>
                    {/* BEGIN SIDEBAR */}
                    <Sidebar />
                    {/* END SIDEBAR */}
                    <div className="main-content flex min-h-screen flex-col">
                        {/* BEGIN TOP NAVBAR */}
                        <Header />
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <div className="animate__animated p-4 sm:p-6 overflow-x-hidden">{children}</div>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER */}
                        <Footer />
                        {/* END FOOTER */}
                    </div>
                </MainContainer>
            </div>
        </ProtectedRoute>
    );
}
