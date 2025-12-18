import { Metadata } from 'next';
import ProfileContent from '@/components/profile/profile-content';

export const metadata: Metadata = {
    title: 'My Profile - Euriqo Admin',
};

const ProfilePage = () => {
    return <ProfileContent />;
};

export default ProfilePage;

