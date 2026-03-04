import React from 'react';

interface FormActionsProps {
  submitLabel: string;
  onCancel: () => void;
  onSubmit?: () => void; // optional if using type="submit"
  submitType?: 'button' | 'submit';
  loading?: boolean;
  className?: string;
}

export default function FormActions({
  submitLabel,
  onCancel,
  onSubmit,
  submitType = 'submit',
  loading = false,
  className = 'mt-8',
}: FormActionsProps) {
  return (
    <div className={`flex justify-end gap-4 ${className}`}>
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
      >
        Cancel
      </button>

      <button
        type={submitType}
        onClick={submitType === 'button' ? onSubmit : undefined}
        disabled={loading}
        className="px-6 py-2 bg-green-700 text-white rounded-md text-sm hover:bg-green-800 disabled:opacity-50"
      >
        {loading ? 'Please wait...' : submitLabel}
      </button>
    </div>
  );
}
