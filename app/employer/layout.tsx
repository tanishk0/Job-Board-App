export default function EmployerDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-slate-50">
            {children}
        </div>
    );
}