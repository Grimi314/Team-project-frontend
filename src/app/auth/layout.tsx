import React from 'react';
import AuthHeader from '../components/authHeader/authHeader';
import AuthFooter from '../components/authFooter/authFooter';
import MainAuthNav from '../components/mainAuthNav/mainAuthNav';
import css from '../auth/register/registerPage.module.css'



interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
      <div className={css.white}>
        
        <AuthHeader />
        
        <MainAuthNav/>
        
        {children}
        
        <AuthFooter/>
      </div>
  );
}