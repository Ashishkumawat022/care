import SidebarItem from "./Sidebar-Item";

const SidebarList = (props) => {
  return (
    <div className="scroll-sidebar">
      <nav className="sidebar-nav">
        <ul id="sidebarnav">
          {props.list.slice(0, 5).map((item, index) => (
            <SidebarItem
              key={index}
              links={item.link}
              src={item.src}
              sidebarName={item.label}
            />
          ))}
          <hr />
          {props.list.slice(5, 9).map((item, index) => (
            <SidebarItem
              key={index}
              links={item.link}
              src={item.src}
              sidebarName={item.label}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarList;
