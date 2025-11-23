interface FullscreenProps {
    children: React.ReactNode;
}

export default function Fullscreen(fullscreenProps: FullscreenProps) {
    const { children } = fullscreenProps;
    return (
        <div>
            <h1>Mobile Page</h1>
            {children}
        </div>
    );
}