"use client";

import { useState } from 'react';
import { useSubscriptionStore } from '@/stores/subscriptions';
import { useToast } from '@/app/context/ToastContext';
import { csvImport, notifications } from '../config/content';
import BaseModal from './ui/BaseModal';
import Button from './ui/Button';

export default function CsvImportModal({ isOpen, onClose }) {
  const { addToast } = useToast();
  const importSubscriptions = useSubscriptionStore((state) => state.importSubscriptions);
  const [file, setFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const robustParseCsv = (text) => {
    const result = [];
    const rows = text.split(/\r?\n/);

    for (let row of rows) {
      if (!row.trim()) continue;

      const cells = [];
      let cell = '';
      let inQuotes = false;

      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
          if (inQuotes && row[i + 1] === '"') {
            cell += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          cells.push(cell.trim());
          cell = '';
        } else {
          cell += char;
        }
      }
      cells.push(cell.trim());
      result.push(cells);
    }
    return result;
  };

  const handleImport = () => {
    if (!file) return;

    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const rows = robustParseCsv(text);

        if (rows.length === 0) {
          throw new Error("Empty file");
        }

        let startIndex = 0;
        const firstRow = rows[0].map(c => c.toLowerCase());
        if (firstRow.includes('name') || firstRow.includes('price')) {
          startIndex = 1;
        }

        const parsedSubs = [];
        for (let i = startIndex; i < rows.length; i++) {
          const row = rows[i];
          if (row.length < 2) continue;

          const [name, price, interval, category, status, renewalDate] = row;

          parsedSubs.push({
            name: name || 'Unnamed Subscription',
            price: parseFloat(price) || 0,
            interval: interval || 'Monthly',
            category: category || 'Other',
            status: status || 'Active',
            renewalDate: renewalDate || new Date().toISOString().split('T')[0],
            color: 'bg-primary'
          });
        }

        if (parsedSubs.length > 0) {
          await importSubscriptions(parsedSubs);
          addToast(notifications.success.import(parsedSubs.length), 'success');
        } else {
          addToast(csvImport.noSubscriptions, 'warning');
        }
        onClose();
      } catch (err) {
        console.error('Failed to parse CSV file:', err);
        addToast(notifications.error.import, 'error');
      } finally {
        setIsParsing(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={csvImport.title}
      maxWidth="max-w-md"
    >
      <div className="p-8">
        <p className="text-app-text-muted font-medium text-base mb-6 leading-relaxed">
          {csvImport.description} <span className="font-bold text-app-text dark:text-app-text-dark">{csvImport.descriptionFileType}</span> {csvImport.descriptionSuffix}
        </p>

        <div className="w-full relative group cursor-pointer mb-8">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="w-full text-center border-2 border-dashed border-slate-300/50 dark:border-white/10 rounded-3xl py-12 px-6 flex flex-col items-center justify-center transition-all bg-app-surface/50 dark:bg-white/5 group-hover:bg-app-surface dark:group-hover:bg-white/10 group-hover:border-primary/50">
            <div className="w-16 h-16 rounded-full bg-app-bg dark:bg-white/5 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <p className="text-app-text dark:text-app-text-dark font-bold tracking-tight mb-1">{file ? file.name : csvImport.selectFile}</p>
            <p className="text-app-text-muted text-sm font-medium">{file ? `${(file.size / 1024).toFixed(1)} KB` : csvImport.dragDrop}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-slate-200/50 dark:border-white/5 pt-6">
          <Button
            variant="subtle"
            onClick={onClose}
            className="flex-1"
          >
            {csvImport.cancelButton}
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || isParsing}
            className="flex-1"
          >
            {isParsing ? csvImport.parsing : csvImport.importButton}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
