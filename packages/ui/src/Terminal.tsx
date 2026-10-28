'use client';

import React, { useState } from 'react';

export interface TerminalTab {
  id: string;
  label: string;
  code: string;
  language?: string;
}

export interface TerminalProps {
  title?: string;
  tabs?: TerminalTab[];
  activeTab?: string;
  singleCode?: string;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  title = 'solidity-engineer // foundry-test',
  tabs,
  activeTab: initialActiveTab,
  singleCode,
  className = '',
}) => {
  const [currentTab, setCurrentTab] = useState(
    initialActiveTab || (tabs && tabs[0] ? tabs[0].id : '')
  );
  const [copied, setCopied] = useState(false);

  const activeContent = tabs
    ? tabs.find((t) => t.id === currentTab)?.code || ''
    : singleCode || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-void font-mono text-xs shadow-2xl ${className}`}>
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-obsidian/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[11px] text-gray-400">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          {tabs && tabs.length > 1 && (
            <div className="flex items-center gap-1 rounded-md bg-panel p-0.5 border border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`rounded px-2.5 py-1 text-[10px] font-medium transition ${
                    currentTab === tab.id
                      ? 'bg-teal/20 text-teal border border-teal/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleCopy}
            className="rounded bg-white/5 px-2.5 py-1 text-[10px] text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            {copied ? '✓ COPIED' : 'COPY'}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 overflow-x-auto text-[11.5px] leading-relaxed text-gray-300 max-h-[380px] overflow-y-auto">
        <pre className="whitespace-pre">{activeContent}</pre>
      </div>
    </div>
  );
};
