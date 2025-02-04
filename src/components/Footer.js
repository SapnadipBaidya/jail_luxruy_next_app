"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13+
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Pinterest as PinterestIcon,
} from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop:"2vh",
  backgroundColor: theme.palette.background.paper,
  color: theme.custom.primaryButtonFontColor,
  padding: '2rem 2rem 3rem',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase',
  
}));

const FooterLink = styled(Box)(({ theme }) => ({
  
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1),
  cursor: 'pointer', // Add cursor pointer to indicate clickable
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialIcons = styled(IconButton)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1.5),
  display: "flex",
  flexDirection: "column",
}));

const Footer = () => {
  const theme = useTheme();
  const router = useRouter(); // Initialize the router

  const handleNavigation = (path) => {
    router.push(path); // Programmatically navigate to the path
  };

  return (
    <FooterContainer>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={3}>
          <SectionTitle variant="h6">Help</SectionTitle>
          <FooterLink onClick={() => handleNavigation('/termcondition')}>Terms and Conditions</FooterLink>
          <FooterLink onClick={() => handleNavigation('/privacypolicy')}>Privacy Policy</FooterLink>
          <FooterLink onClick={() => handleNavigation('/returnrefund')}>Returns and Refunds Policy</FooterLink>
          <FooterLink onClick={() => handleNavigation('/shippingpolicy')}>Shipping Policy</FooterLink>
          <FooterLink onClick={() => handleNavigation('/cancellationpolicy')}>Cancellation Policy</FooterLink>
        </Grid>

        <Grid item xs={12} sm={2}>
          <SectionTitle variant="h6">Company</SectionTitle>
          <FooterLink onClick={() => handleNavigation('/aboutus')}>About Us</FooterLink>
          <FooterLink onClick={() => handleNavigation('/contact')}>Contact Us</FooterLink>
        </Grid>

        <Grid item xs={12} sm={3}>
          <SectionTitle variant="h6">Shop Products</SectionTitle>
          {['Bags', 'Belts', 'Duffle Bags', 'Gloves', 'Jackets', 'Shoes', 'Trolley', 'Wallets'].map((item) => (
            <FooterLink key={item} onClick={() => handleNavigation(`/products/${item.toLowerCase().replace(/ /g, '_')}`)}>
              {item}
            </FooterLink>
          ))}
        </Grid>

        <Grid item xs={12} sm={2}>
          <SectionTitle variant="h6">Social Media</SectionTitle>
          <Box>
            <SocialIcons onClick={() => handleNavigation('#')}>
              <FacebookIcon style={{ color: '#1877F2' }} /> {/* Facebook Blue */}
            </SocialIcons>
            <SocialIcons onClick={() => handleNavigation('#')}>
              <InstagramIcon style={{ color: '#E4405F' }} /> {/* Instagram Pink */}
            </SocialIcons>
            <SocialIcons onClick={() => handleNavigation('#')}>
              <TwitterIcon style={{ color: '#1DA1F2' }} /> {/* Twitter Blue */}
            </SocialIcons>
            <SocialIcons onClick={() => handleNavigation('#')}>
              <LinkedInIcon style={{ color: '#0A66C2' }} /> {/* LinkedIn Blue */}
            </SocialIcons>
            <SocialIcons onClick={() => handleNavigation('#')}>
              <PinterestIcon style={{ color: '#BD081C' }} /> {/* Pinterest Red */}
            </SocialIcons>
          </Box>
        </Grid>

        <Grid item xs={12} sm={2}>
          <SectionTitle variant="h6">Location</SectionTitle>
          {['3633 Prabhash Complex | Mukundopur', 'Bhagwanpur – 24 South Pargana', 'Kolkata 700150', 'India'].map((line, index) => (
            <Typography key={index} variant="body2" color={theme.custom.primaryButtonFontColor}>{line}</Typography>
          ))}
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color={theme.palette.text.secondary.main}>
          Copyright © 2025 Jail Luxury. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;