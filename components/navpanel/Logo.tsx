'use client'
import React from 'react';
import Image from "@/node_modules/next/image";
import { rotateOut } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const RotateOut = styled.div`animation: 10s ${keyframes`${rotateOut}`} infinite`;

const Logo: React.FC = () => {
  return (
    <div>
      <RotateOut><Image src="/navPanel/LogoCenter.svg" alt="Logo Icon" width={50} height={50}/></RotateOut>
    </div>
  );
}

export { Logo };
