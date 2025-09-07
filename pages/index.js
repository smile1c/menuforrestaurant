import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Box, Card, CardContent, CardMedia, Typography, Button, Container, AppBar, Toolbar, Menu, List, ListItem, ListItemText, ListItemAvatar, } from "@mui/material";
import Link from "next/link";

const GoogleMap = () => (
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.4926388093813!2d100.61497831171036!3d13.988778086371665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e281d8ea4a968b%3A0x2154f5fc55afbd1d!2z4Lif4Li04Lin4LmA4LiI4Lit4Lij4LmM4Lie4Liy4Lij4LmM4LiE4Lij4Lix4LiH4Liq4Li04LiVIOC5geC4reC4mSDguKrguYDguJvguKXguKXguYw!5e0!3m2!1sth!2sth!4v1715152885454!5m2!1sth!2sth"
    width="500"
    height="500"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
);

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      const query = await getDocs(collection(db, "menus"));
      const menusData = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenus(menusData);
      setLoading(false);
    };
    fetchMenus();
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <Typography
      style={{
        fontSize: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >Loading...</Typography>;
  }

  return (
    <Container style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg")',
      minHeight: '100vh', // ความสูงเต็มจอ
      minWidth: '100vw',  // ความกว้างเต็มจอ      
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundSize: 'cover', // ขนาดภาพจะปรับให้เต็มพื้นที่ตาม container
      backgroundPosition: 'center', // ภาพจะถูกจัดตำแหน่งกลาง
      alignItems: 'center'
    }}>

      <AppBar position="absolute" sx={{ bgcolor: "rgba(51, 51, 51, 0.7)", border: "3px solid #FFFFFF" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="https://logodix.com/logo/94154.png" alt="Logo" style={{ height: 50, marginRight: 10 }} />
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={open}
            onClose={handleClose}
          >
          </Menu>

        </Toolbar>
      </AppBar >

      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{
          marginTop: "100px",
          fontSize: 150,
          fontFamily: "cursive",
          border: "1px solid #FFFFFF",
          boxShadow: "2px 2px 100px rgba(1, 1, 1, 1)",
          padding: "50px", // เพิ่มระยะห่างรอบข้อความ
          letterSpacing: '5px'
        }}>
        Restaurante Menu
      </Typography>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {menus.map((menu) => (
          <Card
            key={menu.id}
            sx={{
              margin: "12px",
              minWidth: 360,
              maxWidth: 360,
              minHeight: 200,
              borderRadius: 0,
              position: "relative",
              overflow: "hidden",
              bgcolor: "rgba(51, 51, 51, 0.1)",
              border: "2px solid #FFFFFF",
              borderRadius: "45px",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >

            <CardMedia
              component="img"
              height="140"
              image={menu.image_url}
              alt={menu.name}
              sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",

              }}
            />
            <CardContent
              sx={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                bgcolor: "rgba(0,0,0,0.7)",
                color: "#fff",
              }}
            >
              <Typography variant="h5" component="div">
                {menu.type}
              </Typography>
              <Typography variant="body2">
                {menu.info}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "#000000",
                  fontFamily: "cursive",
                  fontSize: 15,
                  transition: "transform 0.2s ease-in-out", // เพิ่ม transition เพื่อทำให้การเปลี่ยนขนาดเกิดขึ้นอย่างสมูท
                  "&:hover": { // สีพื้นหลังเมื่อเม้าส์ hover ไป
                    background: "#006600",
                    transform: "scale(1.05 )", // ปรับขนาดของปุ่มเมื่อ hover
                  },
                  "& a": { // สีของลิงก์
                    color: "#FFFFFF",
                    textDecoration: "none", // ไม่ให้มี underline
                  }
                }}
              >
                <Link href={`/menus/${menu.id}`}>Open {menu.type} MENU</Link>
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>
      <List >
        <ListItem
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '10px',
            marginBottom: '10px',
            transform: "scale(1) translateX(500px)",
            "&:hover": {
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // เพิ่มสีพื้นหลังเมื่อ hover
              cursor: 'pointer', // เปลี่ยน cursor เมื่อ hover   
            }
          }}
        >
          <GoogleMap />
        </ListItem>
      </List>
    </Container>
  );
}