
import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Upgrade";
import Logo from "../shared/logo/Logo";

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  isCollapsed,
}) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sidebarWidth = isCollapsed ? "100px" : "220px";
  const sidebarWidthMobile = "270px";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          borderRadius: "13px",
          transition: "width 0.3s ease-in-out",
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            className: "crm-sidebar-paper",
            sx: {
              boxShadow: "0 9px 17.5px rgb(0,0,0,0.05)",
              width: sidebarWidth,
              boxSizing: "border-box",
              borderRight: 0,
              top: 10,
              left: 10,
              bottom: 10,
              borderRadius: "13px",
              height: "calc(100% - 25px)",
              transition: "width 0.3s ease-in-out",
              zIndex: "auto",
            },
          }}
          className="custom-scroll"
        >
          <Box
            className="custom-scroll"
            sx={{
              overflowY: "auto",
              height: "calc(100vh - 70px)",
            }}
          >
            {/* Logo Header */}
            <Box
              sx={{
                height: "100px",
                minHeight: "100px",
                px: 2,
                overflow: "hidden",
              }}
            >
              <Logo isCollapsed={isCollapsed} />
            </Box>

            {/* Sidebar Menu */}
            <Box>
              <SidebarItems isCollapsed={isCollapsed} />
            </Box>
          </Box>

          {/* Upgrade */}
          <Upgrade isCollapsed={isCollapsed} />
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        className: "crm-sidebar-paper",
        sx: {
          width: sidebarWidthMobile,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* Mobile Logo */}
      <Box
        sx={{
          height: "100px",
          minHeight: "100px",
          px: 2,
          overflow: "hidden",
        }}
      >
        <Logo />
      </Box>

      {/* Mobile Menu */}
      <SidebarItems />

      <Upgrade />
    </Drawer>
  );
};

export default Sidebar;
