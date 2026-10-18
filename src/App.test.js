import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('gsap', () => ({
  __esModule: true,
  default: {
    matchMedia: () => ({ add: jest.fn(), revert: jest.fn() }),
    registerPlugin: jest.fn(),
  },
}));

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

beforeEach(() => {
  window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  }));
  window.open = jest.fn(() => ({ opener: window }));
});

test('opens a WhatsApp enquiry containing all form details', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Ali Khan' } });
  fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '03001234567' } });
  fireEvent.change(screen.getByLabelText('WhatsApp number'), { target: { value: '03248604353' } });
  fireEvent.change(screen.getByLabelText('Email (optional)'), { target: { value: 'ali@example.com' } });
  fireEvent.change(screen.getByLabelText('Course'), { target: { value: 'CCA' } });
  fireEvent.change(screen.getByLabelText('Message (optional)'), { target: { value: 'Please share admission details.' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send enquiry on WhatsApp' }));

  expect(window.open).toHaveBeenCalledTimes(1);
  const [url, target] = window.open.mock.calls[0];
  expect(url).toContain('https://wa.me/923336661470?text=');
  expect(target).toBe('_blank');
  expect(decodeURIComponent(url)).toContain('Name: Ali Khan');
  expect(decodeURIComponent(url)).toContain('Phone: 03001234567');
  expect(decodeURIComponent(url)).toContain('WhatsApp: 03248604353');
  expect(decodeURIComponent(url)).toContain('Email: ali@example.com');
  expect(decodeURIComponent(url)).toContain('Course: CCA');
  expect(decodeURIComponent(url)).toContain('Message: Please share admission details.');
  expect(screen.getByText('Please press Send in WhatsApp to deliver your enquiry.')).toBeInTheDocument();
});
