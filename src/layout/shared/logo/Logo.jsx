
import React from "react";
import { Box } from "@mui/material";
import dfcLogo from "../../../assets/Companylogo/dfc.png";

const Logo = ({ isCollapsed = false }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: isCollapsed ? "center" : "flex-start",
        px: isCollapsed ? 0 : 0.5,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {isCollapsed ? (
        <Box
          component="img"
          src={dfcLogo}
          alt="DFC"
          sx={{
            width: "62px",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 1,
            minWidth: 0,
          }}
        >
          {/* DFC Logo */}
          <Box
            component="img"
            src={dfcLogo}
            alt="DFC Logo"
            sx={{
              width: "56px",
              height: "auto",
              objectFit: "contain",
              flexShrink: 0,
              display: "block",
            }}
          />

          {/* Company Branding */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            {/* Company Name */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "15px",
                fontWeight: 900,
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
              }}
            >
              <Box component="span" sx={{ color: "#F56616" }}>
                DFC
              </Box>

              <Box
                component="span"
                sx={{ color: "#FFFFFF", ml: 0.5 }}
              >
                GROUP
              </Box>
            </Box>

            {/* Orange Divider */}
            <Box
              sx={{
                width: "100%",
                height: "2px",
                backgroundColor: "#F56616",
                my: 0.7,
              }}
            />

            {/* Tagline - Force Single Line
            <Box
              sx={{
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "6px",
                fontWeight: 800,
                letterSpacing: "0.6px",
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                display: "block",
                width: "max-content",
                maxWidth: "none",
              }}
            >
              MOVING BUSINESSES FORWARD
            </Box> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Logo;
