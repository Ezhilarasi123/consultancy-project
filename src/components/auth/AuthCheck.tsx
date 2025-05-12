// import { useAuth } from '../../context/AuthContext';
// import LoginModal from './LoginModal';
// import { useState } from 'react';

// interface AuthCheckProps {
//   children: React.ReactNode;
// }

// const AuthCheck = ({ children }: AuthCheckProps) => {
//   const { isAuthenticated } = useAuth();
//   const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);

//   if (isAuthenticated) {
//     return <>{children}</>;
//   }

//   return (
//     <>
//       {showLoginModal && (
//         <LoginModal
//           isOpen={showLoginModal}
//           onClose={() => setShowLoginModal(false)}
//         />
//       )}
//     </>
//   );
// };

// export default AuthCheck;


import { useAuth } from '../../context/AuthContext';
import LoginModal from './LoginModal';
import { useState, useEffect } from 'react';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);

  useEffect(() => {
    setShowLoginModal(!isAuthenticated);
  }, [isAuthenticated]);

  if (isAuthenticated) return <>{children}</>;

  return (
    <>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default AuthCheck;
