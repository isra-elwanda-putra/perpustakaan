import Image from 'next/image';

const Avatar = ({ name, avatarUrl }) => {
    const getInitials = (name) => {
        const initials = name.split(' ').map(word => word[0]).join('');
        return initials.toUpperCase();
    };

    const initials = getInitials(name);

    return (
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt={name}
                        className="object-cover rounded-full"
                        layout="fill"
                    />
                ) : (
                    <span className="text-3xl">{initials}</span>
                )}
            </div>
        </div>
    );
};

export default Avatar;
