interface ModalProps {
    open: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({
    open,
    title,
    children,
    onClose,
}: ModalProps) {
  if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
        <div className="bg-white rounded-lg w-full max-w-xl p-6">

            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose}>✕</button>
            </div>

            {children}
        </div>
        </div>
    );
}
