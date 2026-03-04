import { DocumentRowProps, IUploadedDoc } from '@/interfaces/IRegister';
import { IResetPassword } from '@/interfaces/ISchool';
import { Pencil, X } from 'lucide-react';
import React, { useState } from 'react';
import InputField from '../inputField';

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export function DocumentRow({ file, removeAFile, editFile, index }: DocumentRowProps) {
  return (
    <div className="flex justify-between items-center border p-3 rounded-md mb-1">
      <span className="text-sm">{file.fileName.split('-')[0]}</span>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => removeAFile(index)}
          className="text-red-500 text-sm font-medium hover:underline"
        >
          Remove
        </button>

        <span className="text-sm">|</span>

        <button
          onClick={() => editFile(index)}
          className="text-green-700 text-sm font-medium hover:underline"
        >
          View
        </button>
      </div>
    </div>
  );
}

interface Props {
  open: boolean;
  file: IUploadedDoc | null;
  onClose: () => void;
  onSave: (file: File) => void;
}

export function ViewFileModal({ open, file, onClose, onSave }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);

  if (!open || !file) return null;

  const isImage = file?.fileName.startsWith('school_images');
  const isPdf = file?.fileName === 'application/pdf';

  const handleCancel = () => {
    setEditMode(false);
    setNewFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">{file?.fileName}</h2>

          <div className="flex gap-3">
            {!editMode && (
              <Pencil
                className="w-5 h-5 cursor-pointer text-green-700"
                onClick={() => setEditMode(true)}
              />
            )}

            <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
          </div>
        </div>

        {/* Preview */}
        <div className="border rounded p-4 h-[450px] overflow-auto flex justify-center items-center">
          {/* IMAGE */}
          {isImage && <img src={file?.url} className="max-h-full" />}

          {/* PDF */}
          {isPdf && <iframe src={file?.url} className="w-full h-full" />}
        </div>

        {/* EDIT MODE */}
        {editMode && (
          <div className="mt-4 border-t pt-4">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleCancel} className="px-4 py-2 border rounded">
                Cancel
              </button>

              <button
                disabled={!newFile}
                onClick={() => {
                  if (newFile) onSave(newFile);
                  setEditMode(false);
                }}
                className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PasswordResetModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (password: IResetPassword) => Promise<boolean>;
}) {
  const [resetPasswords, SetResetPasswords] = useState<IResetPassword>({ pass1: '', pass2: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const spanTag = document.getElementById(name);

    if (spanTag) {
      spanTag.textContent = '';
    }

    SetResetPasswords((prev) => ({ ...prev, [name]: value }));
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Reset Password</h3>

        <div className="space-y-4">
          <InputField
            name="pass1"
            onChange={handleChange}
            placeholder="New password"
            type="string"
            label="password1"
          />

          <InputField
            name="pass2"
            onChange={handleChange}
            placeholder="Confirm password"
            type="string"
            label="Confirm password"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={onClose} className="border px-4 py-2 rounded-md">
            Back
          </button>

          <button
            onClick={() => onSubmit(resetPasswords)}
            type="button"
            className="
        bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
