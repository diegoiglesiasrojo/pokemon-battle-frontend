"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const pages = [
  { name: "Pokemon list", path: "/" },
  { name: "Battle list", path: "/battlelist" },
  { name: "New pokemon", path: "/newpokemon" },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static' style={{ backgroundColor: "#3282B8" }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ height: "25vh" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
              style={{ height: "50px" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.path}>
                    <Typography textAlign='center' style={{ color: "black" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src='/pokemonLogo.png'
                alt='pokemon Logo'
                width={200}
                height={70}
                priority
              />
              <Typography
                variant='h4'
                noWrap
                component='a'
                sx={{
                  display: { xs: "flex", md: "none" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".4rem",
                  color: "inherit",
                  textDecoration: "none",
                  marginLeft: 5,
                }}
              >
                BATTLE
              </Typography>
            </div>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src='/pokemonLogo.png'
                alt='pokemon Logo'
                width={300}
                height={100}
                priority
              />
              <Typography
                variant='h4'
                noWrap
                component='a'
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".4rem",
                  color: "inherit",
                  textDecoration: "none",
                  marginLeft: 5,
                }}
              >
                BATTLE
              </Typography>
            </div>
            {pages.map((page) => (
              <Link
                href={page.path}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ color: "white", display: "block", fontSize: "1.2rem" }}
              >
                {page.name}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
