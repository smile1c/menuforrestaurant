import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { Container, Typography, AppBar, Toolbar, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function MenuDetails() {
  const [menu, setMenu] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { menuId } = router.query;

  useEffect(() => {
    const fetchMenus = async () => {
      if (menuId) {
        setLoading(true);
        const menuRef = doc(db, "menus", menuId);
        const menuDoc = await getDoc(menuRef);
        if (menuDoc.exists()) {
          setMenu(menuDoc.data());
          const menuCol = collection(db, "menus", menuId, "items");
          const menuDocs = await getDocs(menuCol);
          setItems(menuDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
        setLoading(false);
      }
    };

    fetchMenus();
  }, [menuId]);

  if (loading) {
    return <Typography
      style={{
        display: "flex",
        justifyContent: "center", // จัดตำแหน่งแนวนอนตรงกลาง
        alignItems: "center", // จัดตำแหน่งแนวตั้งตรงกลาง
        height: "100vh", // กำหนดความสูงเต็มจอ
      }}
    >Loading...</Typography>;
  }

  return (
    <Container
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg")',
        minHeight: "100vh", // ความสูงเต็มจอ
        minWidth: "100vw", // ความกว้างเต็มจอ
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundSize: "cover", // ขนาดภาพจะปรับให้เต็มพื้นที่ตาม container
        backgroundPosition: "center", // ภาพจะถูกจัดตำแหน่งกลาง
        alignItems: "center",
      }}
    >

      <AppBar position="static" sx={{ bgcolor: "rgba(51, 51, 51, 0.5)", border: "3px solid #FFFFFF" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={() => router.push("/")}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, textAlign: "center", letterSpacing: '10px', fontFamily: "cursive", }}>
            {menu ? menu.type : "Item Details"}
          </Typography>
        </Toolbar>
      </AppBar>

      <List sx={{ width: "100%", maxWidth: 750 }}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '10px',
              marginBottom: '10px',

              "&:hover": {
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // เพิ่มสีพื้นหลังเมื่อ hover
                cursor: 'pointer', // เปลี่ยน cursor เมื่อ hover
                transition: "transform 0.2s",
                transform: "scale(1.1)",
                "& .MuiAvatar-root": {
                  transition: "transform 0.4s",
                  transform: "scale(4) translateX(-50px)",
                }
              }
            }}
          >
            <ListItemAvatar sx={{ width: 64, height: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <Avatar alt={item.name} src={item.image_url} sx={{ width: 64, height: 64 }} />
            </ListItemAvatar>

            <ListItemText sx={{ textAlign: "center" }}
              primary={
                <Typography variant="h5" style={{ color: '#333' }}>
                  {item.name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="body1"
                    style={{ color: '#111', marginRight: '10px' }}
                  >
                    info: {item.info}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#111' }}>
                    {"\t"}Price: {item.price} Baht
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>

      <List sx={{ width: "100%", maxWidth: 750 }}>
        <ListItem
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '10px',
            marginBottom: '10px',

            "&:hover": {
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // เพิ่มสีพื้นหลังเมื่อ hover
              cursor: 'pointer', // เปลี่ยน cursor เมื่อ hover
              transition: "transform 6s",
              transform: "scale(0.95)",

            }
          }}
        >
          <ListItemAvatar sx={{ width: 64, height: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          </ListItemAvatar>

          <ListItemText sx={{ textAlign: "center" }}
            primary={
              <Typography variant="h5" style={{ color: '#333' }}>
                Coming Soon...
              </Typography>
            }
          />
        </ListItem>
      </List>

      <div>

      </div>

    </Container>
  );
}
