import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  cards: any[] = [];
  cardDialog: boolean = false;
  card: any = {};
  editMode: boolean = false;

  constructor() {
    this.cards = [
      {
        id: 1,
        name: 'Corte de Pelo',
        description: 'Cada 5 cortes obtén uno gratis.',
        requiredServices: 5,
        reward: 'Corte Gratis',
        stamps: [true, true, false, false, false]
      },
      {
        id: 2,
        name: 'Limpieza Facial',
        description: 'Cada 10 limpiezas, una gratis.',
        requiredServices: 10,
        reward: 'Limpieza Gratis',
        stamps: [true, true, true, true, false, false, false, false, false, false]
      }
    ];
  }

  openNew() {
    this.card = {};
    this.editMode = false;
    this.cardDialog = true;
  }

  editCard(card: any) {
    this.card = { ...card };
    this.editMode = true;
    this.cardDialog = true;
  }

  deleteCard(card: any) {
    /* this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta tarjeta?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cards = this.cards.filter(c => c.id !== card.id);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarjeta eliminada' });
      }
    }); */
  }

  saveCard() {
    if (this.editMode) {
      this.cards = this.cards.map(c => (c.id === this.card.id ? this.card : c));
      //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarjeta actualizada' });
    } else {
      this.card.id = this.cards.length + 1;
      this.card.stamps = Array(this.card.requiredServices).fill(false);
      this.cards.push(this.card);
      //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarjeta agregada' });
    }
    this.cardDialog = false;
  }

  hideDialog() {
    this.cardDialog = false;
  }

  toggleStamp(card: any, index: number) {
    card.stamps[index] = !card.stamps[index];
  }
}
