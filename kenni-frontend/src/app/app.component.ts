
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Kine {
  id: number;
  name: string;
  specialty: string;
  city: string;
  address: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  available: boolean;
  tags: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  activeTab: 'patients' | 'professionals' = 'patients';

  searchText = '';
  selectedCity = '';
  selectedSpecialty = '';
  selectedKine: Kine | null = null;

  showOrganizationForm = false;
  showAppointmentForm = false;
  successMessage = '';

  appointment = {
    patientName: '',
    phone: '',
    date: '',
    message: ''
  };

  organization = {
    name: '',
    email: '',
    phone: '',
    city: '',
    type: 'Cabinet de kinésithérapie'
  };

  specialties = [
    'Kinésithérapie générale',
    'Rééducation sportive',
    'Rééducation neurologique',
    'Rééducation respiratoire',
    'Kinésithérapie pédiatrique'
  ];

  kinesiotherapists: Kine[] = [
    {
      id: 1,
      name: 'Dr. Amine El Mansouri',
      specialty: 'Kinésithérapie générale',
      city: 'Casablanca',
      address: 'Sidi Maârouf, Casablanca',
      rating: 4.9,
      reviews: 124,
      price: 250,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=85',
      available: true,
      tags: ['Douleurs du dos', 'Rééducation']
    },
    {
      id: 2,
      name: 'Dr. Sara Benali',
      specialty: 'Rééducation sportive',
      city: 'Rabat',
      address: 'Agdal, Rabat',
      rating: 4.8,
      reviews: 98,
      price: 300,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85',
      available: true,
      tags: ['Sport', 'Récupération']
    },
    {
      id: 3,
      name: 'Dr. Youssef Alaoui',
      specialty: 'Rééducation neurologique',
      city: 'Marrakech',
      address: 'Guéliz, Marrakech',
      rating: 4.7,
      reviews: 76,
      price: 280,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=85',
      available: false,
      tags: ['Mobilité', 'Rééducation']
    }
  ];

  get filteredKines(): Kine[] {
    const query = this.searchText.trim().toLowerCase();

    return this.kinesiotherapists.filter((kine) => {
      const matchesQuery =
        !query ||
        kine.name.toLowerCase().includes(query) ||
        kine.specialty.toLowerCase().includes(query) ||
        kine.city.toLowerCase().includes(query) ||
        kine.tags.some(tag => tag.toLowerCase().includes(query));

      const matchesCity =
        !this.selectedCity || kine.city === this.selectedCity;

      const matchesSpecialty =
        !this.selectedSpecialty ||
        kine.specialty === this.selectedSpecialty;

      return matchesQuery && matchesCity && matchesSpecialty;
    });
  }

  get cities(): string[] {
    return [...new Set(this.kinesiotherapists.map(kine => kine.city))];
  }

  selectTab(tab: 'patients' | 'professionals'): void {
    this.activeTab = tab;
    this.successMessage = '';
    document.getElementById('services')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  searchKines(): void {
    document.getElementById('results')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  openAppointment(kine: Kine): void {
    if (!kine.available) {
      this.successMessage = 'Ce professionnel n’est pas disponible actuellement.';
      return;
    }

    this.selectedKine = kine;
    this.showAppointmentForm = true;
    this.successMessage = '';
  }

  submitAppointment(): void {
    if (
      !this.appointment.patientName.trim() ||
      !this.appointment.phone.trim() ||
      !this.appointment.date
    ) {
      return;
    }

    // Démonstration frontend : aucune demande n'est envoyée au serveur.
    this.successMessage =
      `Votre demande pour ${this.selectedKine?.name} est prête. ` +
      'Connectez le backend pour la transmettre au professionnel.';

    this.showAppointmentForm = false;
    this.appointment = {
      patientName: '',
      phone: '',
      date: '',
      message: ''
    };
  }

  openOrganizationForm(): void {
    this.showOrganizationForm = true;
    this.successMessage = '';
    document.getElementById('organization-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  submitOrganization(): void {
    if (
      !this.organization.name.trim() ||
      !this.organization.email.trim() ||
      !this.organization.phone.trim() ||
      !this.organization.city.trim()
    ) {
      return;
    }

    // Démonstration frontend : aucune donnée n'est encore enregistrée.
    this.successMessage =
      'Votre formulaire est prêt. Connectez Spring Boot pour créer le profil professionnel.';

    this.showOrganizationForm = false;
    this.organization = {
      name: '',
      email: '',
      phone: '',
      city: '',
      type: 'Cabinet de kinésithérapie'
    };
  }

  closeAppointment(): void {
    this.showAppointmentForm = false;
    this.selectedKine = null;
  }
}
