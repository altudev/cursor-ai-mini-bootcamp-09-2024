import React from 'react';
import { useTheme } from './ThemeProvider';

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"];

function ThemeSelector() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
                Theme
                <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto">
                {themes.map((t) => (
                    <li key={t}>
                        <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={t}
                            value={t}
                            checked={t === theme}
                            onChange={() => setTheme(t)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThemeSelector;