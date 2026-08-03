<script setup lang="ts">
import { reactive, ref } from 'vue'
import { contactInfo } from '@/data/contact'
import { services } from '@/data/services'
import type { BookingErrors, BookingForm } from '@/types/content'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

type FormStatus = 'idle' | 'success' | 'error'
type FormField = keyof BookingForm

const initialForm: BookingForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  budget: '',
  message: '',
  privacy: false,
}

const form = reactive<BookingForm>({ ...initialForm })
const errors = reactive<BookingErrors>({})
const status = ref<FormStatus>('idle')
const isSubmitting = ref(false)

function clearErrors() {
  const fields = Object.keys(errors) as FormField[]

  fields.forEach((field) => {
    delete errors[field]
  })
}

function setError(field: FormField, message: string) {
  errors[field] = message
}

function validateForm() {
  clearErrors()

  if (!form.name.trim()) {
    setError('name', 'Der Name ist erforderlich.')
  }

  if (!form.email.trim()) {
    setError('email', 'Die E-Mail-Adresse ist erforderlich.')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    setError('email', 'Bitte gib eine gültige E-Mail-Adresse ein.')
  }

  if (!form.service) {
    setError('service', 'Bitte wähle eine Leistung aus.')
  }

  if (!form.date) {
    setError('date', 'Bitte gib einen ungefähren Zeitraum an.')
  }

  if (!form.budget) {
    setError('budget', 'Bitte wähle ein geschätztes Budget aus.')
  }

  if (!form.message.trim()) {
    setError('message', 'Beschreibe kurz, was du brauchst.')
  }

  if (!form.privacy) {
    setError('privacy', 'Bitte akzeptiere die Datenschutzerklärung.')
  }

  return Object.keys(errors).length === 0
}

async function submitForm() {
  status.value = 'idle'

  if (!validateForm()) {
    status.value = 'error'
    return
  }

  isSubmitting.value = true
  await new Promise<void>((resolve) => window.setTimeout(resolve, 800))
  Object.assign(form, initialForm)
  isSubmitting.value = false
  status.value = 'success'
}
</script>

<template>
  <section id="contacto" class="section contact-section">
    <div class="container contact-section__grid">
      <div class="contact-section__info">
        <SectionHeading
          eyebrow="Kontakt und Buchung"
          title="Erzähl uns, wohin dein Klang gehen soll"
          copy="Das Formular ist vorbereitet, um später an eine API angebunden zu werden. Aktuell validiert es Eingaben, zeigt Statusmeldungen und simuliert die Anfrage."
        />

        <div class="contact-section__details" data-reveal>
          <address>
            <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
            <a :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`">{{ contactInfo.phone }}</a>
            <span>{{ contactInfo.address }}</span>
            <span>{{ contactInfo.schedule }}</span>
          </address>
          <div class="contact-section__socials">
            <a v-for="social in contactInfo.socials" :key="social.label" :href="social.href">
              {{ social.label }}
            </a>
          </div>
          <BaseButton :href="contactInfo.whatsapp" variant="secondary">WhatsApp</BaseButton>
        </div>

        <div class="contact-section__map" role="img" :aria-label="contactInfo.mapLabel" data-reveal>
          <span>Karte vorbereitet</span>
        </div>
      </div>

      <form class="booking-form" novalidate data-reveal @submit.prevent="submitForm">
        <div class="booking-form__row">
          <label>
            Name
            <input
              v-model.trim="form.name"
              type="text"
              autocomplete="name"
              :aria-invalid="Boolean(errors.name)"
            />
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>

          <label>
            E-Mail
            <input
              v-model.trim="form.email"
              type="email"
              autocomplete="email"
              :aria-invalid="Boolean(errors.email)"
            />
            <small v-if="errors.email">{{ errors.email }}</small>
          </label>
        </div>

        <div class="booking-form__row">
          <label>
            Telefon optional
            <input v-model.trim="form.phone" type="tel" autocomplete="tel" />
          </label>

          <label>
            Leistung
            <select v-model="form.service" :aria-invalid="Boolean(errors.service)">
              <option value="">Auswählen</option>
              <option v-for="service in services" :key="service.id" :value="service.title">
                {{ service.title }}
              </option>
            </select>
            <small v-if="errors.service">{{ errors.service }}</small>
          </label>
        </div>

        <div class="booking-form__row">
          <label>
            Ungefährer Termin
            <input v-model="form.date" type="date" :aria-invalid="Boolean(errors.date)" />
            <small v-if="errors.date">{{ errors.date }}</small>
          </label>

          <label>
            Geschätztes Budget
            <select v-model="form.budget" :aria-invalid="Boolean(errors.budget)">
              <option value="">Auswählen</option>
              <option value="under-1000">Unter 1.000 EUR</option>
              <option value="1000-3000">1.000 - 3.000 EUR</option>
              <option value="3000-7000">3.000 - 7.000 EUR</option>
              <option value="custom">Individuelles Projekt</option>
            </select>
            <small v-if="errors.budget">{{ errors.budget }}</small>
          </label>
        </div>

        <label>
          Nachricht
          <textarea
            v-model.trim="form.message"
            rows="6"
            :aria-invalid="Boolean(errors.message)"
          ></textarea>
          <small v-if="errors.message">{{ errors.message }}</small>
        </label>

        <label class="booking-form__checkbox">
          <input v-model="form.privacy" type="checkbox" :aria-invalid="Boolean(errors.privacy)" />
          <span>Ich akzeptiere die Datenschutzerklärung.</span>
          <small v-if="errors.privacy">{{ errors.privacy }}</small>
        </label>

        <BaseButton type="submit" :variant="isSubmitting ? 'secondary' : 'primary'">
          {{ isSubmitting ? 'Wird gesendet...' : 'Anfrage senden' }}
        </BaseButton>

        <p v-if="status === 'success'" class="booking-form__success" role="status">
          Anfrage gesendet. Wir melden uns mit dem nächsten passenden Zeitfenster.
        </p>
        <p v-if="status === 'error'" class="booking-form__error" role="alert">
          Bitte prüfe die markierten Felder vor dem Senden.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: radial-gradient(circle at 0% 10%, rgba(215, 181, 109, 0.12), transparent 24rem),
    linear-gradient(180deg, var(--color-charcoal), var(--color-ink));
}

.contact-section__grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(320px, 1fr);
  gap: clamp(2rem, 6vw, 5rem);
}

.contact-section__details {
  display: grid;
  gap: 1.4rem;
  margin-top: 2rem;
}

address,
.contact-section__socials {
  display: grid;
  gap: 0.44rem;
  font-style: normal;
}

address a,
address span,
.contact-section__socials a {
  color: var(--color-muted);
}

.contact-section__socials {
  grid-template-columns: repeat(3, max-content);
  gap: 0.8rem;
}

.contact-section__socials a {
  color: var(--color-gold-bright);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-section__map {
  display: grid;
  min-height: 230px;
  place-items: center;
  margin-top: 2rem;
  overflow: hidden;
  color: var(--color-gold-bright);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border: 1px solid rgba(215, 181, 109, 0.18);
  border-radius: var(--radius-md);
  background:
    linear-gradient(90deg, rgba(246, 239, 225, 0.07) 1px, transparent 1px) 0 0 / 34px 34px,
    linear-gradient(0deg, rgba(246, 239, 225, 0.05) 1px, transparent 1px) 0 0 / 34px 34px,
    rgba(246, 239, 225, 0.035);
}

.booking-form {
  display: grid;
  gap: 1rem;
  padding: clamp(1.2rem, 4vw, 2rem);
  border: 1px solid rgba(215, 181, 109, 0.18);
  border-radius: var(--radius-md);
  background: rgba(5, 4, 3, 0.56);
  box-shadow: var(--shadow-soft);
}

.booking-form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.42rem;
  color: var(--color-beige);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

input,
select,
textarea {
  width: 100%;
  color: var(--color-warm-white);
  border: 1px solid rgba(246, 239, 225, 0.12);
  border-radius: var(--radius-sm);
  background: rgba(246, 239, 225, 0.055);
}

input,
select {
  min-height: 48px;
  padding: 0 0.8rem;
}

textarea {
  min-height: 150px;
  padding: 0.8rem;
  resize: vertical;
}

input[aria-invalid='true'],
select[aria-invalid='true'],
textarea[aria-invalid='true'] {
  border-color: var(--color-danger);
}

small,
.booking-form__error {
  color: var(--color-danger);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
}

.booking-form__checkbox {
  grid-template-columns: auto 1fr;
  align-items: start;
}

.booking-form__checkbox input {
  width: 20px;
  min-height: 20px;
  margin-top: 0.2rem;
  accent-color: var(--color-gold);
}

.booking-form__checkbox small {
  grid-column: 2;
}

.booking-form__success {
  margin: 0;
  color: var(--color-success);
}

.booking-form__error {
  margin: 0;
}

@media (max-width: 920px) {
  .contact-section__grid,
  .booking-form__row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 540px) {
  .contact-section__socials {
    grid-template-columns: 1fr;
  }
}
</style>
