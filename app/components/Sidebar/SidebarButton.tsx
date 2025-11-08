export const SidebarButton = ({
  icon: Icon,
  label,
  onClick,
  collapsed,
}: any) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full mb-3 p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200
      ${collapsed ? "justify-center" : "justify-start"}`}
  >
    <Icon size={20} className={`${collapsed ? "" : "mr-3"} shrink-0`} />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
  </button>
);
