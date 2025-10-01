import React, { useState } from 'react';

function App() {
  const [badgeConfig, setBadgeConfig] = useState({
    label: 'sudo_self',
    message: 'badge_builder',
    color: 'pink',
    style: 'flat',
    logo: '',
    logoColor: 'white',
    labelColor: '',
    isError: false,
  });

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState('light');

  const colorOptions = [
    'brightgreen', 'green', 'yellow', 'yellowgreen', 'orange', 'red', 'blue', 'lightgrey', 'pink', 'purple'
  ];

  const logoOptions = [
    { name: 'None', value: '' },
    { name: 'GitHub', value: 'github' },
    { name: 'Twitter', value: 'twitter' },
    { name: 'Discord', value: 'discord' },
    { name: 'npm', value: 'npm' },
    { name: 'Docker', value: 'docker' },
    { name: 'React', value: 'react' },
    { name: 'Vue.js', value: 'vue.js' },
    { name: 'Python', value: 'python' },
    { name: 'JavaScript', value: 'javascript' },
  ];

  const styleOptions = ['flat', 'plastic', 'flat-square', 'for-the-badge'];

  const updateBadgeConfig = (key, value) => {
    setBadgeConfig(prev => ({ ...prev, [key]: value }));
  };

  const generateBadgeUrl = () => {
    let { label, message, color, style, logo, logoColor, labelColor, isError } = badgeConfig;
    if (isError) color = 'red';
    const params = new URLSearchParams();
    if (style && style !== 'flat') params.append('style', style);
    if (logo) params.append('logo', logo);
    if (logoColor && logoColor !== 'white') params.append('logoColor', logoColor);
    if (labelColor) params.append('labelColor', labelColor);
    return `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateBadgeUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadBadge = () => {
    const link = document.createElement('a');
    link.href = generateBadgeUrl();
    link.download = `${badgeConfig.label}-${badgeConfig.message}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen p-4 flex items-center justify-center transition-colors duration-300 ${previewMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden transition-colors duration-300 ${previewMode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-6 border-b transition-colors duration-300 ${previewMode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
          <h1 className="flex justify-center items-center space-x-2">
            <img
              src="https://img.shields.io/badge/sudo_self-badge_builder-pink?logo=github"
              alt="Badge"
              className="h-8 w-auto"
            />
          </h1>

            <button
              onClick={() => setPreviewMode(prev => prev === 'light' ? 'dark' : 'light')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${previewMode === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {previewMode === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {['basic', 'advanced'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-medium transition-colors duration-200 ${activeTab === tab ? 'border-b-2 border-pink-600 text-pink-600' : 'text-gray-500 hover:text-pink-600'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Config Panel */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Label</label>
                <input type="text" value={badgeConfig.label} onChange={e => updateBadgeConfig('label', e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"/>
              </div>
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <input type="text" value={badgeConfig.message} onChange={e => updateBadgeConfig('message', e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"/>
              </div>
              <div>
                <label className="block mb-1 font-medium">Color</label>
                <select value={badgeConfig.color} onChange={e => updateBadgeConfig('color', e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
                  {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {activeTab === 'advanced' && (
                <>
                  <div>
                    <label className="block mb-1 font-medium">Style</label>
                    <select value={badgeConfig.style} onChange={e => updateBadgeConfig('style', e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
                      {styleOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Logo</label>
                    <select value={badgeConfig.logo} onChange={e => updateBadgeConfig('logo', e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400">
                      {logoOptions.map(l => <option key={l.value} value={l.value}>{l.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Logo Color</label>
                    <input type="text" value={badgeConfig.logoColor} onChange={e => updateBadgeConfig('logoColor', e.target.value)} className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="white, black, #FF0000"/>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" checked={badgeConfig.isError} onChange={e => updateBadgeConfig('isError', e.target.checked)} className="h-4 w-4"/>
                    <label className="font-medium">Error Style (red)</label>
                  </div>
                </>
              )}
            </div>

            {/* Preview Panel */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Preview</h2>
              <img src={generateBadgeUrl()} alt="Badge Preview" className="max-w-full h-auto border p-2 rounded-md shadow"/>
              <div className="flex gap-3">
                <button onClick={copyToClipboard} className="flex-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors duration-200">Copy URL</button>
                <button onClick={downloadBadge} className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors duration-200">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-md shadow-lg animate-fadeIn">
          Badge URL copied!
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default App;

