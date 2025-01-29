"use client"
import { Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";

// ✅ Styled Typography with Overflow Handling
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(14),
  lineHeight: "1.4",
  maxHeight: "3vh",
  maxWidth: "20vw",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  display: "block",
  cursor: "pointer",
}));

// ✅ TruncatedText Component
const TruncatedText = ({ children, maxWidth }) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [children]);

  const content = (
    <StyledTypography ref={textRef} sx={{ maxWidth }}>
      {children}
    </StyledTypography>
  );

  return isTruncated ? <Tooltip title={children} arrow>{content}</Tooltip> : content;
};

// ✅ Prop Type Validation
TruncatedText.propTypes = {
  children: PropTypes.node.isRequired, // Allows any text or component inside
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// ✅ Default Props
TruncatedText.defaultProps = {
  maxWidth: "20vw",
};

export default TruncatedText;
