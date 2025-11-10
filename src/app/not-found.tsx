import { Link } from '@/components/ui';
import { paths } from '@/config/paths';

const NotFoundPage = () => {
    return (
        <div className="mt-52 flex flex-col items-center font-semibold">
            <h1 className="text-primary text-4xl mb-4">404 - Not Found</h1>
            <p className="text-secondary mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link href={paths.home.getHref()} replace>
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;

