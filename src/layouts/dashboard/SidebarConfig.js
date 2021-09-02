import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon(peopleFill)
  },
  {
    title: 'companies',
    path: '/dashboard/companies',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'job posts',
    path: '/dashboard/job-posts',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'applicants',
    path: '/dashboard/applicants',
    icon: getIcon(lockFill)
  },
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
