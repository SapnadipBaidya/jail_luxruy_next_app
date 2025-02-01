"use client";

import React from 'react';
import Link from 'next/link';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  padding: '2rem 2rem 3rem',
  
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
}));

const FooterLink = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialIcons = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: 0,
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1.5),
}));

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterContainer>
      <Grid container spacing={4} justifyContent="center">
        {/* Help Section */}
        <Grid item xs={12} sm={3}>
          <SectionTitle variant="h6">Help</SectionTitle>
          <FooterLink><Link href="/termcondition">Terms and Conditions</Link></FooterLink>
          <FooterLink><Link href="/privacypolicy">Privacy Policy</Link></FooterLink>
          <FooterLink><Link href="/returnrefund">Returns and Refunds Policy</Link></FooterLink>
          <FooterLink><Link href="/shippingpolicy">Shipping Policy</Link></FooterLink>
          <FooterLink><Link href="/cancellationpolicy">Cancellation Policy</Link></FooterLink>
        </Grid>

        {/* Company Section */}
        <Grid item xs={12} sm={2}>
          <SectionTitle variant="h6">Company</SectionTitle>
          <FooterLink><Link href="/aboutus">About Us</Link></FooterLink>
          <FooterLink><Link href="/contactus">Contact Us</Link></FooterLink>
        </Grid>

        {/* Shop Products Section */}
        <Grid item xs={12} sm={3}>
          <SectionTitle variant="h6">Shop Products</SectionTitle>
          <FooterLink><Link href="/shop/bag">Bag</Link></FooterLink>
          <FooterLink><Link href="/shop/belt">Belt</Link></FooterLink>
          <FooterLink><Link href="/shop/duffle-bag">Duffle Bag</Link></FooterLink>
          <FooterLink><Link href="/shop/gloves">Gloves</Link></FooterLink>
          <FooterLink><Link href="/shop/jacket">Jacket</Link></FooterLink>
          <FooterLink><Link href="/shop/shoes">Shoes</Link></FooterLink>
          <FooterLink><Link href="/shop/trolley">Trolley</Link></FooterLink>
          <FooterLink><Link href="/shop/wallet">Wallet</Link></FooterLink>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} sm={2}>
          <SectionTitle variant="h6">Social Media</SectionTitle>
          <Box>
            <Link href="https://facebook.com" target="_blank"><SocialIcons><FacebookIcon /></SocialIcons></Link>
            <Link href="https://instagram.com" target="_blank"><SocialIcons><InstagramIcon /></SocialIcons></Link>
            <Link href="https://twitter.com" target="_blank"><SocialIcons><TwitterIcon /></SocialIcons></Link>
            <Link href="https://linkedin.com" target="_blank"><SocialIcons><LinkedInIcon /></SocialIcons></Link>
            <Link href="https://pinterest.com" target="_blank"><SocialIcons><PinterestIcon /></SocialIcons></Link>
          </Box>
        </Grid>

        {/* Location Section */}
        <Grid item xs={12} sm={2}>
          <SectionTitle variant="h6">Location</SectionTitle>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            3633 Prabhash Complex | Mukundopur
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            Bhagwanpur – 24 South Pargana
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            Kolkata 700150
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            India
          </Typography>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color={theme.palette.text.secondary.main}>
          Copyright © 2025 Jail Luxury. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
