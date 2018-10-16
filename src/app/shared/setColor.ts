export class Colors {
    public setBgColor(color) {
        switch (color) {
            case 'primary':
                return 'bg-primary';
            case 'white':
                return 'bg-white';
            case 'secondary':
                return 'bg-secondary';
            case 'success':
                return 'bg-success';
            case 'danger':
                return 'bg-danger';
            case 'warning':
                return 'bg-warning';
            case 'info':
                return 'bg-info';
            case 'light':
                return 'bg-light';
            case 'dark':
                return 'bg-dark';
            default:
                return 'bg-primary';
        }
    }

    public setTxtColor(color) {
        switch (color) {
            case 'primary':
                return 'text-primary';
            case 'white':
                return 'text-white';
            case 'secondary':
                return 'text-secondary';
            case 'success':
                return 'text-success';
            case 'danger':
                return 'text-danger';
            case 'warning':
                return 'text-warning';
            case 'info':
                return 'text-info';
            case 'light':
                return 'text-light';
            case 'dark':
                return 'text-dark';
            default:
                return 'text-primary';
        }
    }
}