"use client"
import React, { useEffect, useRef } from "react";
import { Box, Typography, Card, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Styled Components for Aesthetics
const Section = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  opacity: 0, // Start hidden for animation
  transform: "translateY(50px)",
  overflow: "hidden",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
}));

const Image = styled("img")({
  width: "100%",
  maxHeight: "300px",
  objectFit: "cover",
  borderRadius: "8px",
  transition: "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
  },
});

const About = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingBottom: 4 }}>
      <Title>Welcome to Jail Luxury, where heritage meets innovation!</Title>
      <Subtitle>
        Founded in 1972 by Shri Ramani Mohan Singh, Jail Luxury began as a humble leather shop on Jail Road, Banka. Today, it is a globally recognized luxury brand.
      </Subtitle>

      {/* ✅ Sections with GSAP Scroll Animation */}
      <Section ref={(el) => sectionsRef.current.push(el)}>
        <Typography variant="h5" fontWeight="bold">Our Journey</Typography>
        <Image src="https://source.unsplash.com/800x400/?leather,fashion" alt="Our Journey" />
        <Typography>
          The story of Jail Luxury is one of resilience and renewal. After the passing of our founder in 1984, the brand was expanded by Mr. Rajesh Ranjan Singh. Overcoming challenges, the brand revived in 2016 with a modern vision. Today, our headquarters in Kolkata drive our global operations.
        </Typography>
      </Section>

      <Section ref={(el) => sectionsRef.current.push(el)}>
        <Typography variant="h5" fontWeight="bold">Our Philosophy</Typography>
        <Image src="https://source.unsplash.com/800x400/?luxury,craftsmanship" alt="Our Philosophy" />
        <Typography>
          At Jail Luxury, we believe that true luxury lies in the details. Our products are crafted using the finest materials, blending heritage with modern sensibilities.
        </Typography>
      </Section>

      <Section ref={(el) => sectionsRef.current.push(el)}>
        <Typography variant="h5" fontWeight="bold">Our Products</Typography>
        <Image src="https://source.unsplash.com/800x400/?handbags,leather" alt="Our Products" />
        <Typography>
          We offer a wide range of leather goods, including:
        </Typography>
        <ul>
          <li>Handbags</li>
          <li>Briefcases</li>
          <li>Laptop Bags</li>
          <li>Travel Bags</li>
          <li>Wallets</li>
          <li>Accessories</li>
          <li>Belts</li>
          <li>Jackets</li>
          <li>Footwear</li>
        </ul>
      </Section>

      <Section ref={(el) => sectionsRef.current.push(el)}>
        <Typography variant="h5" fontWeight="bold">Why Jail?</Typography>
        <Image src="https://source.unsplash.com/800x400/?history,vintage" alt="Why Jail?" />
        <Typography>
          The name "Jail" is a nod to our roots, as the original shop was on Jail Road in Banka. It represents our journey from a small shop in Bihar to a luxury brand.
        </Typography>
      </Section>

      <Section ref={(el) => sectionsRef.current.push(el)}>
        <Typography variant="h5" fontWeight="bold">Join Us on Our Journey</Typography>
        <Image src="https://source.unsplash.com/800x400/?teamwork,success" alt="Join Us" />
        <Typography>
          Explore our collections and experience the unparalleled luxury that only Jail can offer.
        </Typography>
      </Section>
    </Container>
  );
};

export default About;
