import Container from "./Container";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/auth";

const GENRE_ITEMS = [
  { label: "Action", href: "#" },
  { label: "Romance", href: "#" },
  { label: "Fantasy", href: "#" }
];

const LIST_ITEMS = [
  { label: "Popular Today", href: "#popular-today" },
  { label: "Trending This Week", href: "#trending-this-week" },
  { label: "Latest Releases", href: "#latest-releases" },
  { label: "Recently Updates", href: "#recently-updates" },
  { label: "Most Popular", href: "#most-popular" }
];

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null); // 🟢 lưu thông tin user
  const genreRef = useRef(null);
  const listRef = useRef(null);

  const handleDropdownToggle = useCallback((dropdown) => {
    setOpenDropdown(prev => prev === dropdown ? null : dropdown);
  }, []);

  // 🟢 Lấy thông tin user khi component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        console.log('Fetched user:', currentUser);
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        genreRef.current && !genreRef.current.contains(e.target) &&
        listRef.current && !listRef.current.contains(e.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-purple-950 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-14">
          {/* Left: Logo + nav */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src="./logo/comic.png" alt="Logo" className="h-22 w-auto hover:opacity-80 transition-opacity" />
            </Link>

            <nav className="flex gap-4 text-white text-base font-medium">
              <Link to="/" className="hover:text-yellow-300 transition-colors"> Home </Link>

              {/* Dropdown Genre */}
              <div className="relative" ref={genreRef}>
                <button
                  onClick={() => handleDropdownToggle('genre')}
                  className="hover:text-yellow-300 flex items-center gap-1 transition-colors"
                >
                  Genre ▾
                </button>
                {openDropdown === 'genre' && (
                  <div className="absolute top-full mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-10">
                    {GENRE_ITEMS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-950/10 transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown List */}
              <div className="relative" ref={listRef}>
                <button
                  onClick={() => handleDropdownToggle('list')}
                  className="hover:text-yellow-300 flex items-center gap-1 transition-colors"
                >
                  List ▾
                </button>
                {openDropdown === 'list' && (
                  <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    {LIST_ITEMS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-950/10 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-yellow-300 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Search + Login/User */}
          <div className="flex items-center gap-2">
            <SearchBox />
            {user ? (
              <UserInfo user={user} />  // 🟢 Hiển thị tên user
            ) : (
              <LoginButton />           // 🟡 Nếu chưa login thì hiển thị nút login
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

const SearchBox = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search comics, manga, manhua..."
      className="pl-3 pr-9 py-1.5 w-72 rounded-lg bg-white text-sm border focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all"
    />
    <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-300 transition-colors">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </div>
);

const LoginButton = () => (
  <Link
    to="/login"
    className="bg-yellow-300 text-purple-950 px-3 py-1 rounded font-medium hover:bg-yellow-200 transition-colors text-sm inline-block"
  >
    Login
  </Link>
);

// 🟢 Component hiển thị user đã login
const UserInfo = ({ user }) => (
  
  <div className="flex items-center gap-2 text-white">
    <span className="font-medium">{user.fullname}</span>
    {/* <img
      src={user.avatar || "/default-avatar.png"}
      alt="avatar"
      className="w-8 h-8 rounded-full object-cover border border-white/40"
    /> */}
  </div>
);

export default Header;
