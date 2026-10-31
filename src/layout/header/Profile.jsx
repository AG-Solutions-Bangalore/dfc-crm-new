import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import profile from "../../../public/user-1.jpg";
import { IconChevronDown, IconMail, IconUser } from "@tabler/icons-react";
import Logout from "../../components/Logout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";
import ProfileDialog from "./ProfileDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";

const Profile = ({ showUserDetails = false, inSidebar = false }) => {
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenLogout = () => setOpenModal(!openModal);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState({
    full_name: "",
    dl_no: "",
    mobile: "",
    dl_expiry: "",
    email: "",
    hazard_lice_no: "",
    vehicle_type: "",
    hazard_lice_expiry: "",
    user_address: "",
  });
  const [forgotpassword, setForgotPassword] = useState({
    old_password: "",
    password: "",
    conformpassword: "",
  });

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/web-fetch-profiles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(res.data.user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile data");
    }
  };

  const onUpdateProfile = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true);
    const data = {
      first_name: profileData.full_name,
      vehicle_type: profileData.vehicle_type,
      user_address: profileData.user_address,
      dl_no: profileData.dl_no,
      dl_expiry: profileData.dl_expiry,
      hazard_lice_no: profileData.hazard_lice_no,
      hazard_lice_expiry: profileData.hazard_lice_expiry,
    };
    try {
      const res = await axios.post(`${BASE_URL}/api/web-update-profile`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        toast.success("Profile Updated Successfully!");
        handleClose();
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile not updated");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (forgotpassword.password !== forgotpassword.conformpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (forgotpassword.old_password === forgotpassword.password) {
      toast.error("Old and new passwords cannot be the same");
      return;
    }
    let data = {
      old_password: forgotpassword.old_password,
      password: forgotpassword.password,
      username: localStorage.getItem("name"),
    };
    try {
      await axios.post(`${BASE_URL}/api/web-change-password`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Password Updated Successfully!");
      handleClose1();
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Invalid old password");
    }
  };

  const handleClose = () => setOpenDialog(false);
  const handleClose1 = () => setOpenDialog1(false);

  return (
    <Box sx={{ width: inSidebar ? "100%" : "auto" }}>
      {inSidebar ? (
        <Button
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl2)}
          onClick={(e) => setAnchorEl2(e.currentTarget)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: 1.25,
            py: 0.75,
            borderRadius: "12px",
            color: "#ffffff",
            textTransform: "none",
            transition: "all 0.2s ease-in-out",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Avatar
              alt="Admin User"
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#0A1D3D",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 800,
                boxShadow: "0 0 0 2px #F56616",
              }}
            >
              AU
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <Box component="span" sx={{ color: "#ffffff", fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>
                Admin User
              </Box>
              <Box component="span" sx={{ color: "#94a3b8", fontSize: 10, fontWeight: 500, lineHeight: 1.2 }}>
                Head Office
              </Box>
            </Box>
          </Box>
          <IconChevronDown width={16} height={16} style={{ color: "#94a3b8" }} />
        </Button>
      ) : showUserDetails ? (
        <Button
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl2)}
          onClick={(e) => setAnchorEl2(e.currentTarget)}
          sx={{
            display: "flex",
            gap: 1.25,
            minWidth: 0,
            px: 1,
            py: 0.5,
            borderRadius: 999,
            color: "inherit",
            textTransform: "none",
            "&:hover": { backgroundColor: "#f8fafc" },
          }}
        >
          <Avatar
            alt="Admin User"
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#0A1D3D",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              boxShadow: "0 0 0 2px rgba(245, 102, 22, 0.3)",
            }}
          >
            AU
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", textAlign: "left" }}>
            <Box component="span" sx={{ color: "#0f172a", fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>
              Admin User
            </Box>
            <Box component="span" sx={{ color: "#64748b", fontSize: 10, lineHeight: 1.2 }}>
              Head Office
            </Box>
          </Box>
          <IconChevronDown width={16} height={16} />
        </Button>
      ) : (
        <IconButton
          size="large"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl2)}
          onClick={(e) => setAnchorEl2(e.currentTarget)}
        >
          <Avatar src={profile} alt="profile" sx={{ width: 35, height: 35 }} />
        </IconButton>
      )}

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={() => setAnchorEl2(null)}
        anchorOrigin={
          inSidebar
            ? { horizontal: "center", vertical: "top" }
            : { horizontal: "right", vertical: "bottom" }
        }
        transformOrigin={
          inSidebar
            ? { horizontal: "center", vertical: "bottom" }
            : { horizontal: "right", vertical: "top" }
        }
        sx={{
          "& .MuiMenu-paper": {
            width: inSidebar ? "230px" : showUserDetails ? "300px" : "200px",
            borderRadius: "12px",
            mb: inSidebar ? 1 : 0,
            boxShadow: "0 16px 36px rgba(15, 23, 42, 0.24)",
          },
        }}
      >
        <MenuItem
          sx={{ py: 1.25 }}
          onClick={() => {
            setOpenDialog(true);
            getData();
            setAnchorEl2(null);
          }}
        >
          <ListItemIcon>
            <IconUser width={18} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }}>
            My Profile
          </ListItemText>
        </MenuItem>
        <MenuItem
          sx={{ py: 1.25 }}
          onClick={() => {
            setOpenDialog1(true);
            setAnchorEl2(null);
          }}
        >
          <ListItemIcon>
            <IconMail width={18} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }}>
            Change Password
          </ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={handleOpenLogout}
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ borderRadius: 999, py: 0.75, fontSize: 12, fontWeight: 700 }}
          >
            Logout
          </Button>
        </Box>
      </Menu>

      <Logout open={openModal} handleOpen={handleOpenLogout} />

      {/* Profile Dialog */}
      <ProfileDialog
        open={openDialog}
        handleClose={handleClose}
        profile={profileData}
        setProfile={setProfileData}
        onUpdateProfile={onUpdateProfile}
        isButtonDisabled={isButtonDisabled}
      />

      <ChangePasswordDialog
        setForgotPassword={setForgotPassword}
        open={openDialog1}
        handleClose={handleClose1}
        forgotpassword={forgotpassword}
        onChangePassword={onChangePassword}
      />
    </Box>
  );
};

export default Profile;
