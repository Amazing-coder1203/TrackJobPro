import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ApplicationList from '../components/ApplicationList';
import { getCurrentUser, isUserLoggedIn, logoutUser } from '../services/auth-service';
import { supabase } from '../supabaseClient';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';
import * as d3 from 'd3';

function JobTrackerMain() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [animationKey, setAnimationKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🎯 NEW: View toggle state (kanban or list)
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'

  // 🎯 NEW: List view filter states
  const [filterCompany, setFilterCompany] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const formRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    company: "",
    contact: "",
    email: "",
    source_url: "",
    notes: "",
    status: "Applied",
    date_applied: new Date().toISOString().split('T')[0],
    salary: ""
  });

  // 💾 NEW: Load applications on mount from Supabase
  useEffect(() => {
    const fetchApplications = async () => {
      const user = getCurrentUser();
      if (user) {
        const { data, error } = await supabase
          .from('job_applications')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching applications:', error);
        } else {
          setApplications(data || []);
        }
      }
    };

    fetchApplications();
  }, []);

  // Enhanced CSS styles embedded in the component
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary-50: #eff6ff;
      --primary-100: #dbeafe;
      --primary-500: #3b82f6;
      --primary-600: #2563eb;
      --primary-700: #1d4ed8;
      --primary-900: #1e3a8a;
      --secondary-500: #8b5cf6;
      --secondary-600: #7c3aed;
      --gray-50: #f9fafb;
      --gray-100: #f3f4f6;
      --gray-200: #e5e7eb;
      --gray-300: #d1d5db;
      --gray-400: #9ca3af;
      --gray-500: #6b7280;
      --gray-600: #4b5563;
      --gray-700: #374151;
      --gray-800: #1f2937;
      --gray-900: #111827;
      --success-500: #10b981;
      --warning-500: #f59e0b;
      --error-500: #ef4444;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
      --radius-sm: 0.375rem;
      --radius-base: 0.5rem;
      --radius-lg: 0.75rem;
      --radius-xl: 1rem;
      --radius-2xl: 1.5rem;
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-5: 1.25rem;
      --space-6: 1.5rem;
      --space-8: 2rem;
      --space-10: 2.5rem;
      --space-12: 3rem;
      --space-16: 4rem;
      --space-20: 5rem;
      --space-24: 6rem;
      --space-32: 8rem;
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-base: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-2xl: 1.5rem;
      --font-size-3xl: 1.875rem;
      --font-size-4xl: 2.25rem;
      --font-size-5xl: 3rem;
      --font-weight-light: 300;
      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;
      --font-weight-extrabold: 800;
      --transition-base: all 0.2s ease-in-out;
      --transition-slow: all 0.3s ease-in-out;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* Navigation */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--gray-200);
      transition: var(--transition-base);
    }

    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-4) var(--space-6);
      max-width: 1400px;
      margin: 0 auto;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-name {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--gray-900);
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: var(--space-6);
    }

    .nav-link {
      color: var(--gray-600);
      background: none;
      border: none;
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: var(--transition-base);
      text-decoration: none;
    }

    .nav-link:hover {
      color: var(--primary-600);
    }

    .nav-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: var(--space-1);
    }

    .nav-toggle span {
      width: 24px;
      height: 2px;
      background: var(--gray-700);
      transition: var(--transition-base);
      transform-origin: center;
    }

    .nav-toggle.open span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.open span:nth-child(2) {
      opacity: 0;
    }

    .nav-toggle.open span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: var(--space-6);
        box-shadow: var(--shadow-lg);
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s ease;
      }

      .nav-menu.open {
        transform: translateY(0);
        opacity: 1;
      }

      .nav-toggle {
        display: flex;
      }
    }

    .job-tracker-container {
      min-height: 100vh;
      padding: 6rem 1rem 2rem 1rem;
      background: white;
      position: relative;
      overflow: hidden;
    }

    .background-elements {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }

    .main-content {
      position: relative;
      z-index: 10;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeInDown 0.8s ease-out;
    }

    .header h1 {
      font-size: 3rem;
      font-weight: 800;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
      text-shadow: none;
    }

    .header p {
      font-size: 1.2rem;
      color: var(--gray-600);
      font-weight: 400;
    }

    .stats-bar {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
      flex-wrap: wrap;
    }

    .stat-item {
      background: white;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-xl);
      padding: 1.5rem 2rem;
      text-align: center;
      color: var(--gray-900);
      min-width: 150px;
      box-shadow: var(--shadow-lg);
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      display: block;
      color: var(--primary-600);
    }

    .stat-label {
      color: var(--gray-600);
    }

    .controls-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 2rem 0;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .filter-controls {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--gray-200);
      background: white;
      color: var(--gray-700);
      border-radius: var(--radius-base);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .filter-btn:hover,
    .filter-btn.active {
      background: var(--gray-50);
      border-color: var(--primary-500);
      color: var(--primary-600);
    }

    /* 🎯 NEW: View Toggle Styles */
    .view-toggle-container {
      display: flex;
      gap: 0.5rem;
      background: var(--gray-100);
      padding: 0.25rem;
      border-radius: var(--radius-lg);
      border: 1px solid var(--gray-200);
    }

    .view-toggle-btn {
      padding: 0.5rem 1rem;
      border: none;
      background: transparent;
      color: var(--gray-600);
      border-radius: var(--radius-base);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .view-toggle-btn:hover {
      color: var(--gray-900);
    }

    .view-toggle-btn.active {
      background: white;
      color: var(--primary-600);
      box-shadow: var(--shadow-sm);
    }

    .view-toggle-btn svg {
      width: 18px;
      height: 18px;
    }

    .form-container {
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-2xl);
      padding: 2.5rem;
      margin-bottom: 3rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: slideInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      max-height: ${showForm ? 'none' : '0'};
      overflow: hidden;
      opacity: ${showForm ? '1' : '0'};
      visibility: ${showForm ? 'visible' : 'hidden'};
      transition: all 0.4s ease-in-out;
      color: white;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--gray-200);
    }

    .form-header h2 {
      font-size: 1.75rem;
      color: white;
      font-weight: 700;
      letter-spacing: -0.025em;
    }

    .close-form-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--gray-400);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: var(--radius-base);
      transition: all 0.2s ease;
    }

    .close-form-btn:hover {
      background: var(--gray-100);
      color: var(--gray-600);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-label {
      font-weight: 600;
      color: var(--gray-400);
      margin-bottom: 0.625rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .form-input,
    .form-select,
    .form-textarea {
      padding: 0.875rem 1.25rem;
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #000000;
      color: white;
    }

    .form-select option {
      background: #1a1a1a;
      color: white;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--primary-500);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
      transform: translateY(-1px);
    }

    .form-textarea {
      min-height: 100px;
      resize: vertical;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: var(--radius-lg);
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn:focus {
      outline: 2px solid var(--primary-500);
      outline-offset: 2px;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
      color: white;
      box-shadow: var(--shadow-base);
    }

    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      color: var(--gray-700);
      border: 1px solid var(--gray-300);
    }

    .btn-outline:hover {
      background: var(--gray-50);
      border-color: var(--gray-400);
    }

    .btn-secondary {
      background: var(--gray-100);
      color: var(--gray-700);
      border: 1px solid var(--gray-300);
    }

    .btn-secondary:hover {
      background: var(--gray-200);
      color: var(--gray-800);
    }

    .btn-success {
      background: linear-gradient(135deg, var(--success-500), #059669);
      color: white;
      box-shadow: var(--shadow-base);
    }

    .btn-success:hover {
      background: linear-gradient(135deg, #059669, #047857);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .add-job-btn {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
      color: var(--primary-600);
      border: 2px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      font-size: 1rem;
      padding: 1rem 2rem;
      border-radius: var(--radius-xl);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-lg);
    }

    .add-job-btn:hover {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-3px);
      box-shadow: var(--shadow-xl);
    }

    /* 🎯 LIST VIEW STYLES */
    .applications-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    .applications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .application-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: var(--radius-2xl);
      padding: 1.5rem;
      box-shadow: var(--shadow-xl);
      transition: all 0.3s ease;
      animation: slideInUp 0.6s ease-out;
      position: relative;
      overflow: hidden;
    }

    .application-card,
    .application-card * {
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }

    .application-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-2xl);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .application-card.dragging {
      opacity: 0;
      background: transparent;
      box-shadow: none;
      border: 2px dashed var(--gray-300);
      pointer-events: none;
    }

    .application-card.dragging * {
      visibility: hidden;
    }

    .kanban-column-content.drop-target {
      background: var(--primary-50);
      border: 2px dashed var(--primary-300);
      border-radius: var(--radius-lg);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-800);
      margin: 0;
      line-height: 1.3;
    }

    .card-company {
      font-size: 1rem;
      color: var(--primary-600);
      font-weight: 600;
      margin: 0.25rem 0;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-base);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-applied {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .status-interview {
      background: #fef3c7;
      color: #d97706;
    }

    .status-offer {
      background: #dcfce7;
      color: #16a34a;
    }

    .status-rejected {
      background: #fee2e2;
      color: #dc2626;
    }

    .card-details {
      margin: 1rem 0;
      space-y: 0.5rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--gray-600);
      margin-bottom: 0.5rem;
    }

    .detail-icon {
      width: 16px;
      height: 16px;
      opacity: 0.7;
    }

    .card-notes {
      margin: 1rem 0;
      padding: 0.75rem;
      background: var(--gray-50);
      border-radius: var(--radius-base);
      font-size: 0.875rem;
      color: var(--gray-700);
      line-height: 1.5;
      border-left: 3px solid var(--primary-500);
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--gray-200);
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
    }

    .btn-edit {
      background: var(--primary-100);
      color: var(--primary-700);
      border: 1px solid var(--primary-200);
    }

    .btn-edit:hover {
      background: var(--primary-200);
      color: var(--primary-800);
    }

    .btn-delete {
      background: #fee2e2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }

    .btn-delete:hover {
      background: #fecaca;
      color: #b91c1c;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--gray-600);
      animation: fadeIn 0.6s ease-out;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--gray-900);
    }

    .empty-description {
      font-size: 1rem;
      opacity: 0.8;
    }

    /* 🎯 LIST TABLE COMPONENT STYLES */
    .list-table-container {
      width: 100%;
      margin-top: 2rem;
      box-shadow: 0 2px 24px rgba(0, 0, 0, 0.1);
      background: #fff;
      border-radius: 1.25rem;
      overflow-x: auto;
    }

    .list-filters-row {
      display: flex;
      gap: 1.5rem;
      padding: 1.25rem 2rem 0.5rem 2rem;
      background: #f3f4f6;
      border-radius: 1.25rem 1.25rem 0 0;
      flex-wrap: wrap;
    }

    .list-filter-input {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid #d1d5db;
      font-size: 1rem;
      background: #fff;
      font-weight: 500;
      transition: all 0.3s ease;
      flex: 1;
      min-width: 150px;
    }

    .list-filter-input:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .list-filter-input.company {
      flex: 1.5;
    }

    .list-filter-input.role {
      flex: 1.5;
    }

    .list-filter-input.date {
      flex: 1;
      min-width: 180px;
    }

    .list-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    .list-table thead tr {
      background: #eef2ff;
    }

    .list-table th {
      padding: 1rem 0.75rem;
      border-bottom: 2px solid #d1d5db;
      text-align: left;
      font-size: 0.875rem;
      font-weight: 700;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: #eef2ff;
      position: sticky;
      top: 0;
    }

    .list-table td {
      padding: 1rem 0.75rem;
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
      font-size: 0.875rem;
      color: #374151;
    }

    .list-row {
      transition: background 0.16s ease, box-shadow 0.16s ease;
    }

    .list-row:hover {
      background: #f3f4f6;
    }

    .list-row.company {
      font-weight: 600;
      color: var(--primary-600);
    }

    .list-row.role {
      color: #374151;
    }

    .list-row.status {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.75rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.25rem;
      text-align: center;
    }

    .list-row.status.status-applied {
      color: #2563eb;
      background: #dbeafe;
    }

    .list-row.status.status-interview {
      color: #d97706;
      background: #fef3c7;
    }

    .list-row.status.status-offer {
      color: #16a34a;
      background: #dcfce7;
    }

    .list-row.status.status-rejected {
      color: #dc2626;
      background: #fee2e2;
    }

    .list-row.contact {
      color: #6b7280;
    }

    .list-row.email {
      color: var(--primary-600);
      word-break: break-word;
    }

    .list-row.date {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .list-row.salary {
      font-weight: 600;
      color: #059669;
    }

    .list-row.url {
      text-align: center;
      font-size: 1.25rem;
    }

    .list-row.url a {
      text-decoration: none;
      transition: transform 0.2s ease;
    }

    .list-row.url a:hover {
      transform: scale(1.3);
    }

    .list-row.notes {
      color: #6b7280;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .list-table tbody tr td:last-child {
      display: flex;
      gap: 0.5rem;
      padding: 1rem 0.75rem;
    }

    .btn-sm.btn-edit,
    .btn-sm.btn-delete {
      border: 1px solid;
      background: #e0e7ff;
      color: #2563eb;
      border-radius: 0.375rem;
      margin: 0;
      padding: 0.375rem 0.75rem;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.75rem;
      transition: all 0.2s ease;
    }

    .btn-sm.btn-delete {
      background: #fee2e2;
      color: #dc2626;
      border-color: #fecaca;
    }

    .btn-sm.btn-edit:hover {
      background: #bfdbfe;
      color: #1d4ed8;
      filter: brightness(0.95);
    }

    .btn-sm.btn-delete:hover {
      background: #fecaca;
      color: #b91c1c;
      filter: brightness(0.95);
    }

    .notification {
      position: fixed;
      top: 90px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      color: white;
      font-weight: 600;
      z-index: 1001;
      animation: slideInRight 0.3s ease-out;
      box-shadow: var(--shadow-xl);
      backdrop-filter: blur(10px);
    }

    .notification.success {
      background: linear-gradient(135deg, var(--success-500), #059669);
    }

    .notification.error {
      background: linear-gradient(135deg, var(--error-500), #dc2626);
    }

    .notification.info {
      background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(300px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }

    /* Kanban Board */
    .kanban-container {
      display: flex;
      gap: 1.25rem;
      height: 75vh;
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f1f5f9;
      border: 1px solid var(--gray-200);
      border-radius: 24px;
      overflow-x: auto;
      overflow-y: hidden;
      width: 100%;
      scrollbar-width: thin;
      scrollbar-color: var(--primary-300) transparent;
      scroll-behavior: smooth;
    }

    .kanban-container::-webkit-scrollbar {
      height: 8px;
    }

    .kanban-container::-webkit-scrollbar-thumb {
      background: var(--primary-300);
      border-radius: 10px;
    }

    .kanban-container::-webkit-scrollbar {
      height: 8px;
    }

    .kanban-container::-webkit-scrollbar-thumb {
      background: var(--primary-200);
      border-radius: 10px;
    }

    .kanban-column {
      flex: 0 0 280px;
      background: #ffffff;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-xl);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      transition: background-color 0.2s ease;
    }

    .drop-target {
      background-color: #f8fafc !important;
    }

    .kanban-column-header {
      color: var(--gray-900);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      margin-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      padding-bottom: 0.5rem;
      flex-shrink: 0;
    }

    .kanban-column-content {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      position: relative;
      padding: 0.5rem;
      margin: 0;
      transform: none !important;
    }

    .kanban-column-content::-webkit-scrollbar {
      width: 6px;
    }

    .kanban-column-content::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
    }

    .kanban-column-content::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.3);
      border-radius: 3px;
    }

    .kanban-column-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.5);
    }

    .kanban-column-content {
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.3) rgba(255,255,255,0.1);
    }

    .empty-column {
      flex: none;
      text-align: center;
      padding: 1rem;
      color: rgba(255,255,255,0.6);
      font-style: italic;
      border: 2px dashed rgba(255,255,255,0.2);
      border-radius: var(--radius-lg);
      margin-top: 1rem;
    }

    @media (max-width: 1024px) {
      .kanban-container {
        flex-direction: column;
        overflow-x: auto;
        height: auto;
      }

      .kanban-column {
        min-width: 280px;
        height: 400px;
        flex-shrink: 0;
      }
    }

    @media (max-width: 768px) {
      .job-tracker-container {
        padding: 5rem 1rem 2rem 1rem;
      }

      .header h1 {
        font-size: 2rem;
      }

      .stats-bar {
        gap: 1rem;
      }

      .stat-item {
        min-width: 120px;
        padding: 1rem 1.5rem;
      }

      .controls-section {
        flex-direction: column;
        align-items: stretch;
      }

      .applications-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }

      .card-actions {
        flex-direction: column;
      }

      .kanban-container {
        height: auto;
      }

      .kanban-column {
        min-width: 250px;
        height: 350px;
      }

      .list-filters-row {
        flex-direction: column;
      }

      .list-filter-input {
        width: 100%;
      }

      .list-table {
        font-size: 0.75rem;
      }

      .list-table td {
        padding: 0.75rem 0.5rem;
      }

      .list-table th {
        padding: 0.75rem 0.5rem;
      }
    }

    .analytics-section {
      background: #f1f5f9;
      border-radius: 32px;
      padding: 4rem 2rem;
      margin: 4rem 0;
      position: relative;
    }

    .analytics-header {
      margin-bottom: 3rem;
      text-align: center;
    }

    .analytics-header h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .sankey-wrapper {
      height: 600px;
      width: 100%;
      position: relative;
    }

    .sankey-node-label {
      font-family: 'Inter', sans-serif;
      pointer-events: none;
    }

    .sankey-node-name {
      font-size: 14px;
      font-weight: 600;
      fill: #1e293b;
    }

    .sankey-node-value {
      font-size: 24px;
      font-weight: 800;
      fill: #1e293b;
    }

    .recharts-sankey-link:hover {
      stroke-opacity: 0.8 !important;
    }

    /* Mobile Responsiveness */
    @media (max-width: 1024px) {
      .main-content {
        max-width: 100%;
        padding: 0 1rem;
      }
      
      .kanban-container {
        height: 65vh;
      }
    }

    @media (max-width: 768px) {
      .header h1 {
        font-size: 2.25rem;
      }

      .stats-bar {
        gap: 1rem;
        padding: 0 1rem;
      }

      .stat-item {
        flex: 1 1 120px;
        min-width: 120px;
        padding: 1rem;
      }

      .stat-number {
        font-size: 1.5rem;
      }

      .controls-section {
        flex-direction: column;
        align-items: stretch;
      }

      .analytics-section {
        padding: 2rem 1rem;
        margin: 2rem 0;
      }

      .sankey-wrapper {
        height: 400px;
      }

      .kanban-container {
        padding: 1rem;
        gap: 1rem;
      }

      .kanban-column {
        flex: 0 0 250px;
      }
    }
  `;

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newStatus = destination.droppableId;

    try {
      // Optimistic update
      setApplications(prev =>
        prev.map(app =>
          app.id.toString() === draggableId
            ? { ...app, status: newStatus }
            : app
        )
      );

      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', draggableId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('Failed to update status in database', 'error');
      // Revert if needed (simplified here)
    }
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navbar functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    console.log(`Scrolling to ${sectionId}`);
    setIsMobileMenuOpen(false);
  };

  const handleButtonClick = (event, action) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      transform: scale(0);
      z-index: 1;
      animation: ripple 0.6s ease-out;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    if (action === 'signup') {
      showNotification('🎉 Welcome! Sign up functionality coming soon!', 'success');
    } else if (action === 'signin') {
      showNotification('👋 Sign in functionality coming soon!', 'info');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.company) {
      showNotification('Job title and company are required!', 'error');
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      showNotification('You must be logged in to save applications!', 'error');
      return;
    }

    try {
      if (editingApp) {
        const { data, error } = await supabase
          .from('job_applications')
          .update({
            ...form
          })
          .eq('id', editingApp.id)
          .select();

        if (error) throw error;

        setApplications(applications.map(app =>
          app.id === editingApp.id ? data[0] : app
        ));
        setEditingApp(null);
        showNotification('Job application updated successfully!', 'success');
      } else {
        const { data, error } = await supabase
          .from('job_applications')
          .insert([
            { ...form, user_id: user.id }
          ])
          .select();

        if (error) throw error;

        setApplications([data[0], ...applications]);
        showNotification('Job application added successfully!', 'success');
      }

      setForm({
        title: "",
        company: "",
        contact: "",
        email: "",
        source_url: "",
        notes: "",
        status: "Applied",
        date_applied: new Date().toISOString().split('T')[0],
        salary: ""
      });
      setShowForm(false);
      setAnimationKey(prev => prev + 1);
    } catch (error) {
      console.error('Error saving application:', error);
      showNotification(`Error: ${error.message}`, 'error');
    }
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setForm(app);
    setShowForm(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = async (app) => {
    if (window.confirm(`Are you sure you want to delete the application for ${app.title} at ${app.company}?`)) {
      try {
        const { error } = await supabase
          .from('job_applications')
          .delete()
          .eq('id', app.id);

        if (error) throw error;

        setApplications(applications.filter(a => a.id !== app.id));
        showNotification('Job application deleted successfully!', 'success');
        setAnimationKey(prev => prev + 1);
      } catch (error) {
        console.error('Error deleting application:', error);
        showNotification(`Error: ${error.message}`, 'error');
      }
    }
  };

  const handleCancel = () => {
    setEditingApp(null);
    setForm({
      title: "",
      company: "",
      contact: "",
      email: "",
      source_url: "",
      notes: "",
      status: "Applied",
      date_applied: new Date().toISOString().split('T')[0],
      salary: ""
    });
    setShowForm(false);
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status.toLowerCase() === statusFilter.toLowerCase();
  });

  // Get statistics
  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'Applied').length,
    interview: applications.filter(app => ['Interview', 'Offer', 'Accepted', 'Declined'].includes(app.status)).length,
    offers: applications.filter(app => ['Offer', 'Accepted', 'Declined'].includes(app.status)).length,
    accepted: applications.filter(app => app.status === 'Accepted').length,
    rejected: applications.filter(app => app.status === 'Rejected').length
  };


  const renderAnalytics = () => {
    // 1. Prepare Data
    // Reference-accurate colors
    const nodePalette = {
      total: '#94a3b8',      // Greyish
      interviews: '#3b82f6',   // Bright Blue
      rejected: '#f97316',    // Orange
      ghosted: '#fb7185',     // Pink-ish Red
      offers: '#0ea5e9',      // Sky Blue
      noOffer: '#22c55e',     // Green
      accepted: '#eab308',    // Gold/Yellow
      declined: '#a855f7'     // Purple
    };

    // Counts for display
    const counts = {
      total: applications.length,
      interviews: applications.filter(a => ['Interview', 'Offer', 'Accepted', 'Declined'].includes(a.status)).length,
      rejected: applications.filter(a => a.status === 'Rejected').length,
      ghosted: applications.filter(a => a.status === 'Applied').length,
      offers: applications.filter(a => ['Offer', 'Accepted', 'Declined'].includes(a.status)).length,
      accepted: applications.filter(a => a.status === 'Accepted').length,
      declined: applications.filter(a => a.status === 'Declined').length,
    };
    counts.noOffer = counts.interviews - counts.offers; // Derived

    const getCompanies = (statusList) => {
      return applications
        .filter(a => statusList.includes(a.status))
        .map(a => a.company)
        .filter((value, index, self) => self.indexOf(value) === index)
        .slice(0, 5);
    };

    // 2. Define Nodes in Strict Layers
    // Layer 0: Start
    // Layer 1: First Outcome
    // Layer 2: Second Outcome
    // Layer 3: Final Outcome
    const nodes = [
      { name: 'Applications', layer: 0, color: nodePalette.total },

      { name: 'Interviews', layer: 1, color: nodePalette.interviews },
      { name: 'Rejected', layer: 1, color: nodePalette.rejected, companies: getCompanies(['Rejected']) },
      { name: 'Ghosted', layer: 1, color: nodePalette.ghosted, companies: getCompanies(['Applied']) },

      { name: 'Offers', layer: 2, color: nodePalette.offers, companies: getCompanies(['Offer', 'Accepted', 'Declined']) },
      { name: 'No Offer', layer: 2, color: nodePalette.noOffer, companies: getCompanies(['Interview']) },

      { name: 'Accepted', layer: 3, color: nodePalette.accepted, companies: getCompanies(['Accepted']) },
      { name: 'Declined', layer: 3, color: nodePalette.declined, companies: getCompanies(['Declined']) }
    ];

    // Map names to indices for link creation
    const nodeMap = new Map(nodes.map((n, i) => [n.name, i]));

    // 3. Generate Links based on individual application paths
    const links = [];

    applications.forEach(app => {
      // Path 1: Applications -> Rejected (Layer 0 -> 1)
      if (app.status === 'Rejected') {
        links.push({ source: nodeMap.get('Applications'), target: nodeMap.get('Rejected'), value: 1, color: nodePalette.rejected });
      }

      // Path 2: Applications -> Ghosted (Layer 0 -> 1)
      if (app.status === 'Applied') {
        links.push({ source: nodeMap.get('Applications'), target: nodeMap.get('Ghosted'), value: 1, color: nodePalette.ghosted });
      }

      // Path 3: Applications -> Interviews (Layer 0 -> 1)
      if (['Interview', 'Offer', 'Accepted', 'Declined', 'No Offer'].includes(app.status)) {
        // Determine "flow color" based on final outcome
        let color = nodePalette.interviews;
        if (app.status === 'Accepted') color = nodePalette.accepted;
        if (app.status === 'Declined') color = nodePalette.declined;
        if (app.status === 'Offer') color = nodePalette.offers;
        if (app.status === 'No Offer') color = nodePalette.noOffer;

        links.push({ source: nodeMap.get('Applications'), target: nodeMap.get('Interviews'), value: 1, color });
      }

      // Path 4: Interviews -> No Offer (Layer 1 -> 2)
      if (app.status === 'Interview') {
        // Only if they stopped at Interview status
        links.push({ source: nodeMap.get('Interviews'), target: nodeMap.get('No Offer'), value: 1, color: nodePalette.noOffer });
      }

      // Path 5: Interviews -> Offers (Layer 1 -> 2)
      if (['Offer', 'Accepted', 'Declined'].includes(app.status)) {
        let color = nodePalette.offers;
        if (app.status === 'Accepted') color = nodePalette.accepted;
        if (app.status === 'Declined') color = nodePalette.declined;

        links.push({ source: nodeMap.get('Interviews'), target: nodeMap.get('Offers'), value: 1, color });
      }

      // Path 6: Offers -> Final (Layer 2 -> 3)
      if (app.status === 'Accepted') {
        links.push({ source: nodeMap.get('Offers'), target: nodeMap.get('Accepted'), value: 1, color: nodePalette.accepted });
      }
      if (app.status === 'Declined') {
        links.push({ source: nodeMap.get('Offers'), target: nodeMap.get('Declined'), value: 1, color: nodePalette.declined });
      }
    });

    // 4. Compute Layout utilizing d3-sankey
    if (nodes.length === 0 || applications.length === 0) return null;

    const width = 1200;
    const height = 700; // Increased height for better spacing
    const margin = { top: 40, right: 250, bottom: 100, left: 40 }; // Generous margins to prevent clipping

    const sankeyGenerator = d3Sankey()
      .nodeWidth(20)
      .nodePadding(60) // Increased padding between nodes
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .nodeAlign((node, n) => node.layer)
      .nodeSort(null);

    // D3 modifies data in place, so spread shallow copies
    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyGenerator({
      nodes: nodes.map(d => Object.assign({}, d)),
      links: links.map(d => Object.assign({}, d))
    });

    return (
      <div className="analytics-section animate-in">
        <div className="analytics-header">
          <h2>Your Journey</h2>
        </div>
        <div className="sankey-wrapper" style={{ height: '700px', width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} maintainAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <g>
              {/* Links */}
              {sankeyLinks.map((link, i) => {
                return (
                  <path
                    key={i}
                    d={sankeyLinkHorizontal()(link)}
                    stroke={link.color || '#cbd5e1'}
                    strokeWidth={Math.max(link.width, 2)}
                    fill="none"
                    strokeOpacity={0.5}
                    style={{ transition: 'all 0.4s ease', mixBlendMode: 'multiply' }}
                  >
                    <title>{`${link.source.name} → ${link.target.name}\n${link.value} Applications`}</title>
                  </path>
                );
              })}

              {/* Nodes */}
              {sankeyNodes.map((node, i) => {
                // Determine display count
                let displayValue = 0;
                switch (node.name) {
                  case 'Applications': displayValue = counts.total; break;
                  case 'Interviews': displayValue = counts.interviews; break;
                  case 'Rejected': displayValue = counts.rejected; break;
                  case 'Ghosted': displayValue = counts.ghosted; break;
                  case 'Offers': displayValue = counts.offers; break;
                  case 'No Offer': displayValue = counts.noOffer; break;
                  case 'Accepted': displayValue = counts.accepted; break;
                  case 'Declined': displayValue = counts.declined; break;
                }

                const isLeft = node.x0 < width / 2;
                const companies = node.companies || [];

                return (
                  <g key={i}>
                    <rect
                      x={node.x0}
                      y={node.y0}
                      width={node.x1 - node.x0}
                      height={node.y1 - node.y0}
                      fill={node.color}
                      rx={4}
                      ry={4}
                      fillOpacity={0.9}
                    >
                      <title>{`${node.name}: ${displayValue}`}</title>
                    </rect>

                    {/* Label */}
                    <text
                      x={isLeft ? node.x1 + 15 : node.x0 - 15}
                      y={(node.y1 + node.y0) / 2}
                      dy="-0.5em"
                      textAnchor={isLeft ? "start" : "end"}
                      fill="#1e293b"
                      style={{ fontWeight: 'bold', pointerEvents: 'none' }}
                    >
                      <tspan style={{ fontSize: '28px', fontWeight: '900', fill: node.color }}>{displayValue}</tspan>
                      <tspan dx="8" style={{ fontSize: '16px', fill: '#475569', fontWeight: '700' }}>{node.name}</tspan>
                    </text>

                    {/* Company List */}
                    {companies.length > 0 && (
                      <g transform={`translate(${isLeft ? node.x1 + 15 : node.x0 - 15}, ${(node.y1 + node.y0) / 2 + 15})`}>
                        {companies.map((co, idx) => (
                          <text
                            key={idx}
                            y={idx * 16}
                            textAnchor={isLeft ? "start" : "end"}
                            style={{ fontSize: '13px', fill: '#64748b', fontWeight: '500' }}
                          >
                            {isLeft ? `${co}` : `${co}`}
                          </text>
                        ))}
                        {companies.length === 5 && (
                          <text y={5 * 16} textAnchor={isLeft ? "start" : "end"} style={{ fontSize: '11px', fill: '#94a3b8' }}>...</text>
                        )}
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    );
  };

  // Render application card
  const renderApplicationCard = (app, index, isDraggable = false) => {
    const CardContent = () => (
      <>
        <div className="card-header">
          <div>
            <h3 className="card-title">{app.title}</h3>
            <p className="card-company">{app.company}</p>
          </div>
          <span className={`status-badge status-${app.status.toLowerCase()}`}>
            {app.status}
          </span>
        </div>

        <div className="card-details">
          {app.date_applied && (
            <div className="detail-item">
              <span>📅</span>
              <span>Applied: {new Date(app.date_applied).toLocaleDateString()}</span>
            </div>
          )}
          {app.salary && (
            <div className="detail-item">
              <span>💰</span>
              <span>{app.salary}</span>
            </div>
          )}
          {app.contact && (
            <div className="detail-item">
              <span>👤</span>
              <span>{app.contact}</span>
            </div>
          )}
          {app.email && (
            <div className="detail-item">
              <span>📧</span>
              <span>{app.email}</span>
            </div>
          )}
          {app.source_url && (
            <div className="detail-item">
              <span>🔗</span>
              <a href={app.source_url} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--primary-600)', textDecoration: 'none' }}>
                View Posting
              </a>
            </div>
          )}
        </div>

        {app.notes && (
          <div className="card-notes">
            <strong>Notes:</strong> {app.notes}
          </div>
        )}

        <div className="card-actions">
          <button
            className="btn btn-sm btn-edit"
            onClick={() => handleEdit(app)}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-sm btn-delete"
            onClick={() => handleDelete(app)}
          >
            🗑️ Delete
          </button>
        </div>
      </>
    );

    if (isDraggable) {
      return (
        <Draggable key={app.id} draggableId={app.id.toString()} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`application-card ${snapshot.isDragging ? 'dragging' : ''}`}
              style={{
                ...provided.draggableProps.style,
                marginBottom: '1rem'
              }}
            >
              <CardContent />
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <div key={app.id} className="application-card">
          <CardContent />
        </div>
      );
    }
  };

  // Render Kanban view
  const renderKanbanView = () => {
    const statuses = ['Applied', 'Interview', 'Offer', 'Accepted', 'Declined', 'Rejected'];

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-container">
          {statuses.map(status => {
            const statusApps = filteredApplications.filter(app => app.status === status);

            return (
              <div key={status} className="kanban-column">
                <div className="kanban-column-header">
                  {status} ({statusApps.length})
                </div>
                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`kanban-column-content ${snapshot.isDraggingOver ? 'drop-target' : ''}`}
                    >
                      {statusApps.length === 0 ? (
                        <div className="empty-column">No {status.toLowerCase()} applications</div>
                      ) : (
                        statusApps.map((app, index) => renderApplicationCard(app, index, true))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    );
  };

  // 🎯 Render List view with ApplicationList component
  const renderListView = () => {
    return (
      <ApplicationList
        applications={filteredApplications}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filterCompany={filterCompany}
        setFilterCompany={setFilterCompany}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
    );
  };

  return (
    <>
      <style>{styles}</style>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <div className="logo-icon">
              <span style={{ fontSize: '2rem' }}>🎯</span>
            </div>
            <span className="brand-name">JobTracker</span>
          </div>

          <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/about" className="nav-link">About</Link>
            {isUserLoggedIn() ? (
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await logoutUser();
                  navigate('/');
                }}
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline"
                  onClick={(e) => handleButtonClick(e, 'signin')}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleButtonClick(e, 'signup')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div
            className={`nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="job-tracker-container">
        <div className="background-elements"></div>

        <div className="main-content">
          {/* Header */}
          <div className="header">
            <h1>Job Application Tracker</h1>
            <p>Manage your job search with style 🚀</p>
          </div>

          {/* Statistics */}
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.applied}</span>
              <span className="stat-label">Applied</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.interview}</span>
              <span className="stat-label">Interviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.offers}</span>
              <span className="stat-label">Offers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ color: 'var(--success-500)' }}>{stats.accepted}</span>
              <span className="stat-label">Accepted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ color: 'var(--error-500)' }}>{stats.rejected}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>

          {/* Controls Section */}
          <div className="controls-section">
            <div className="filter-controls">
              <button
                className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${statusFilter === 'applied' ? 'active' : ''}`}
                onClick={() => setStatusFilter('applied')}
              >
                Applied
              </button>
              <button
                className={`filter-btn ${statusFilter === 'interview' ? 'active' : ''}`}
                onClick={() => setStatusFilter('interview')}
              >
                Interview
              </button>
              <button
                className={`filter-btn ${statusFilter === 'offer' ? 'active' : ''}`}
                onClick={() => setStatusFilter('offer')}
              >
                Offer
              </button>
              <button
                className={`filter-btn ${statusFilter === 'rejected' ? 'active' : ''}`}
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected
              </button>
            </div>

            {/* View Toggle Buttons */}
            <div className="view-toggle-container">
              <button
                className={`view-toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
                onClick={() => setViewMode('kanban')}
                title="Kanban View"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Kanban
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                List
              </button>
            </div>

            <button
              className="btn btn-primary add-job-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '✖️ Close Form' : '➕ Add New Job'}
            </button>
          </div>

          {/* Form Container */}
          <div ref={formRef} className="form-container">
            <div className="form-header">
              <h2>{editingApp ? 'Edit Job Application' : 'Add New Job Application'}</h2>
              <button className="close-form-btn" onClick={handleCancel}>
                ✖️
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-input"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company *</label>
                  <input
                    type="text"
                    name="company"
                    className="form-input"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g., Google"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input
                    type="text"
                    name="contact"
                    className="form-input"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g., recruiter@company.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Job Posting URL</label>
                  <input
                    type="url"
                    name="source_url"
                    className="form-input"
                    value={form.source_url}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-input"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="e.g., $100k - $150k"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Date Applied</label>
                  <input
                    type="date"
                    name="date_applied"
                    className="form-input"
                    value={form.date_applied}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-textarea"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any additional notes about this application..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {editingApp ? '💾 Update Application' : '➕ Add Application'}
                </button>
              </div>
            </form>
          </div>

          {/* 🎯 CONDITIONAL RENDERING: Kanban or List View */}
          {viewMode === 'kanban' ? renderKanbanView() : renderListView()}

          {/* 🎯 ANALYTICS SECTION */}
          {renderAnalytics()}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </>
  );
}

export default JobTrackerMain;
